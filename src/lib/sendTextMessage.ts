import { getTwilioClient } from './twilioClient';

interface SendTextMessageParams {
  to: string;
  body: string;
}

const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER as string;

export async function sendTextMessage({ to, body }: SendTextMessageParams) {
  const twilioClient = getTwilioClient();
  const res = await twilioClient.messages.create({
    from: TWILIO_PHONE_NUMBER,
    body,
    to,
  });

  console.log(res);
}
