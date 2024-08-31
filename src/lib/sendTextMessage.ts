import { getTwilioClient } from './twilioClient';

interface SendTextMessageParams {
  to: string;
  body: string;
}

const TWILIO_MESSAGING_SERVICE_SID = process.env
  .TWILIO_MESSAGING_SERVICE_SID as string;

export async function sendTextMessage({ to, body }: SendTextMessageParams) {
  const twilioClient = getTwilioClient();
  const res = await twilioClient.messages.create({
    from: '+17372327444',
    body,
    to,
    messagingServiceSid: TWILIO_MESSAGING_SERVICE_SID,
  });
}
