import { snsClient } from '@/config/awsSnsClient';
import { phoneRegex } from '@/lib/regex';
import { PublishCommand, PublishCommandInput } from '@aws-sdk/client-sns';

import { isValidPhoneNumber } from 'libphonenumber-js';

interface SendMessageParams {
  phone: string;
  message: string;
  messageAttributes?: PublishCommandInput['MessageAttributes'];
}

export async function sendText({
  phone,
  message,
  messageAttributes,
}: SendMessageParams): Promise<void> {
  if (!phone || !(isValidPhoneNumber(phone, 'US') && phoneRegex.test(phone))) {
    throw new Error('Invalid phone number format.');
  }

  if (!message || message.trim() === '') {
    throw new Error('Message cannot be empty.');
  }

  const command = new PublishCommand({
    PhoneNumber: phone,
    Message: message,
    MessageAttributes: messageAttributes,
  });

  await snsClient.send(command);
}
