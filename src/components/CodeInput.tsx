import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/InputOtp';
import { OTP_LENGTH } from '@/config/auth';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CodeInput(props: any) {
  return (
    <InputOTP maxLength={OTP_LENGTH} {...props}>
      <InputOTPGroup>
        <InputOTPSlot autoFocus index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
}
