import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY as string;

export const resendClient = new Resend(RESEND_API_KEY);
