import { snsClient } from '@/config/awsConfig';
import { PublishCommand } from '@aws-sdk/client-sns';

export const sendSnsOtp = async (phoneNumber: string, otp: string) => {
  const message = `Your OTP code is: ${otp}`;

  const publishCommand = new PublishCommand({
    Message: message,
    PhoneNumber: phoneNumber,
  });

  return snsClient.send(publishCommand);
};
