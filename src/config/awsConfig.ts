import { SNSClient } from '@aws-sdk/client-sns';

const AWS_SNS_ACCESS_KEY = process.env.AWS_SNS_ACCESS_KEY as string;
const AWS_SNS_SECRET_ACCESS_KEY = process.env
  .AWS_SNS_SECRET_ACCESS_KEY as string;
const AWS_SNS_REGION = process.env.AWS_SNS_REGION as string;

export const snsClient = new SNSClient({
  region: AWS_SNS_REGION,
  credentials: {
    accessKeyId: AWS_SNS_ACCESS_KEY,
    secretAccessKey: AWS_SNS_SECRET_ACCESS_KEY,
  },
});
