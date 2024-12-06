import { writePrisma } from '@/config/prismaWriteClient';
import { readCsv } from '@/lib/readCsv';
import { Schedule } from '@prisma/client';
import * as path from 'path';

const filePath = path.resolve(__dirname, '../data/demo-schedules.csv');

export async function seedSchedules() {
  let scheduleData = await readCsv<Schedule>(filePath);

  scheduleData = scheduleData.map((row) => {
    row['timezone'] = Number(row['timezone']);
    row['count'] = row['count'] ? Number(row['count']) : null;
    row['interval'] = row['interval'] ? Number(row['interval']) : null;
    row['serviceId'] = row['serviceId'] ? row['serviceId'] : null;
    row['serviceAtLocationId'] = row['serviceAtLocationId']
      ? row['serviceAtLocationId']
      : null;
    return row;
  });

  await writePrisma.schedule.createMany({
    data: scheduleData,
  });
}
