'use server';

import { readPrisma } from '@/config/prismaReadClient';
import { generateResourceMessage } from '@/lib/generateResourceMessage';
import { sendText } from '@/lib/sendText';
import { createSendResourceSchema } from '@/schemas/sendResourceFormSchema';
import { StatusType } from '@prisma/client';
import { getTranslations } from 'next-intl/server';

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function onSubmitAction(
  _prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const formData = Object.fromEntries(data);

  // Extract selectedResources before Zod validation
  const { selectedResources, ...zodFormData } = formData;

  const t = await getTranslations();
  const sendResourceSchema = createSendResourceSchema(t);

  const parsed = sendResourceSchema.safeParse(zodFormData);

  if (!parsed.success) {
    const fields: Record<string, string> = {};

    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString();
    }
    return {
      message: 'Invalid form data',
      fields,
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

  const {
    data: { phone },
  } = parsed;

  if (typeof selectedResources !== 'string') {
    return {
      message: 'Invalid form data',
      issues: ['Invalid JSON data'],
    };
  }

  let parsedSelectedResources;

  try {
    parsedSelectedResources = JSON.parse(selectedResources);
  } catch {
    return {
      message: 'Invalid JSON data',
      issues: ['Invalid JSON data'],
    };
  }

  if (!Array.isArray(parsedSelectedResources)) {
    return {
      message: 'Invalid JSON data',
      issues: ['Invalid JSON data'],
    };
  }

  if (parsedSelectedResources.length === 0) {
    return {
      message: 'Invalid JSON data',
      issues: ['Invalid JSON data'],
    };
  }

  const hashmap = new Map<string, Set<number>>();

  for (const { locationId, serviceAtLocationIdx } of parsedSelectedResources) {
    if (hashmap.has(locationId)) {
      hashmap.get(locationId)?.add(serviceAtLocationIdx);
    } else {
      hashmap.set(locationId, new Set([serviceAtLocationIdx as number]));
    }
  }

  const locationIds = parsedSelectedResources.map(
    ({ locationId }) => locationId,
  );

  let resourceData;
  try {
    resourceData = await readPrisma.location.findMany({
      where: {
        id: {
          in: locationIds,
        },
      },
      include: {
        organization: true,
        serviceAtLocation: {
          where: {
            service: {
              status: StatusType.ACTIVE,
            },
          },
          include: {
            service: {
              include: {
                requiredDocuments: true,
              },
            },
          },
        },
        addresses: true,
        phones: true,
        accessability: true,
      },
    });
  } catch (err) {
    console.log(err);
    return {
      message: 'Something went wrong',
      issues: ['Something went wrong'],
    };
  }

  const selectedResourceObjs = resourceData.flatMap((location) =>
    location.serviceAtLocation
      .filter((_, idx) => hashmap.get(location.id)?.has(idx))
      .map((serviceAtLocation, idx) => ({
        ...location,
        serviceAtLocation: [serviceAtLocation],
        serviceAtLocationIdx: idx,
      })),
  );

  const message = generateResourceMessage({
    resourceData: selectedResourceObjs,
  });

  try {
    await sendText({ phone, message });
  } catch {
    return {
      message: 'Something went wrong',
      issues: ['Something went wrong'],
    };
  }

  return { message: 'success' };
}
