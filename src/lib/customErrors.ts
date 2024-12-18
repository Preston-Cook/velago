import { CredentialsSignin } from 'next-auth';

export class CustomError extends CredentialsSignin {
  stack?: string | undefined = undefined;
}

export class OtpSendError extends CustomError {
  message: string = 'Failed to send OTP';
  code: string = '500';
  type:
    | 'AccessDenied'
    | 'AdapterError'
    | 'CallbackRouteError'
    | 'ErrorPageLoop'
    | 'EventError'
    | 'InvalidCallbackUrl'
    | 'CredentialsSignin'
    | 'InvalidEndpoints'
    | 'InvalidCheck'
    | 'JWTSessionError'
    | 'MissingAdapter'
    | 'MissingAdapterMethods'
    | 'MissingAuthorize'
    | 'MissingSecret'
    | 'OAuthAccountNotLinked'
    | 'OAuthCallbackError'
    | 'OAuthProfileParseError'
    | 'SessionTokenError'
    | 'OAuthSignInError'
    | 'EmailSignInError'
    | 'SignOutError'
    | 'UnknownAction'
    | 'UnsupportedStrategy'
    | 'InvalidProvider'
    | 'UntrustedHost'
    | 'Verification'
    | 'MissingCSRF'
    | 'AccountNotLinked'
    | 'DuplicateConditionalUI'
    | 'MissingWebAuthnAutocomplete'
    | 'WebAuthnVerificationError'
    | 'ExperimentalFeatureNotEnabled' = 'CredentialsSignin';
}

export class InvalidOrExpiredOtpError extends CustomError {
  message: string = 'Invalid or Expired OTP';
  code: string = '401';
  type:
    | 'AccessDenied'
    | 'AdapterError'
    | 'CallbackRouteError'
    | 'ErrorPageLoop'
    | 'EventError'
    | 'InvalidCallbackUrl'
    | 'CredentialsSignin'
    | 'InvalidEndpoints'
    | 'InvalidCheck'
    | 'JWTSessionError'
    | 'MissingAdapter'
    | 'MissingAdapterMethods'
    | 'MissingAuthorize'
    | 'MissingSecret'
    | 'OAuthAccountNotLinked'
    | 'OAuthCallbackError'
    | 'OAuthProfileParseError'
    | 'SessionTokenError'
    | 'OAuthSignInError'
    | 'EmailSignInError'
    | 'SignOutError'
    | 'UnknownAction'
    | 'UnsupportedStrategy'
    | 'InvalidProvider'
    | 'UntrustedHost'
    | 'Verification'
    | 'MissingCSRF'
    | 'AccountNotLinked'
    | 'DuplicateConditionalUI'
    | 'MissingWebAuthnAutocomplete'
    | 'WebAuthnVerificationError'
    | 'ExperimentalFeatureNotEnabled' = 'AccessDenied';
}

export class UserNotFoundError extends CustomError {
  code: string = '404';
  type:
    | 'AccessDenied'
    | 'AdapterError'
    | 'CallbackRouteError'
    | 'ErrorPageLoop'
    | 'EventError'
    | 'InvalidCallbackUrl'
    | 'CredentialsSignin'
    | 'InvalidEndpoints'
    | 'InvalidCheck'
    | 'JWTSessionError'
    | 'MissingAdapter'
    | 'MissingAdapterMethods'
    | 'MissingAuthorize'
    | 'MissingSecret'
    | 'OAuthAccountNotLinked'
    | 'OAuthCallbackError'
    | 'OAuthProfileParseError'
    | 'SessionTokenError'
    | 'OAuthSignInError'
    | 'EmailSignInError'
    | 'SignOutError'
    | 'UnknownAction'
    | 'UnsupportedStrategy'
    | 'InvalidProvider'
    | 'UntrustedHost'
    | 'Verification'
    | 'MissingCSRF'
    | 'AccountNotLinked'
    | 'DuplicateConditionalUI'
    | 'MissingWebAuthnAutocomplete'
    | 'WebAuthnVerificationError'
    | 'ExperimentalFeatureNotEnabled' = 'Verification';
}
