import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface OrganizationSignInFormProps {
  dic: {};
  validation: {};
}

export function OrganizationSignInForm() {
  const phoneSignUpFormSchema = z.object({
    orgName: z.string().min(3, { message }),
  });

  const form = useForm<z.infer<typeof phoneSignUpFormSchema>>({
    resolver: zodResolver(phoneSignUpFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      code: '',
    },
  });

  const { control, getValues, setValue, handleSubmit: handleSubmitHook } = form;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitHook(handleSubmit)}>
        <div className="grid gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={control}
              name={'orgName'}
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>{dic.labels[0]}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={'Aaron'}
                        {...field}
                        className="block w-full bg-secondary"
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
            <FormField
              control={control}
              name={'lastName'}
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>{dic.labels[1]}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={'Swartz'}
                        {...field}
                        className="block w-full bg-secondary"
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
          </div>
          <FormField
            control={control}
            name={'email'}
            render={({ field }) => (
              <>
                <FormItem className="grid gap-2">
                  <FormLabel>{`${dic.labels[3]}`}</FormLabel>
                  <FormControl>
                    {/* @ts-ignore */}
                    <Input
                      placeholder={'example@velago.com'}
                      {...field}
                      className="block w-full bg-secondary"
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={control}
            name="phone"
            render={({ field }) => (
              <>
                <FormItem
                  className="grid gap-2"
                  onChange={(e) => {
                    const { target } = e;

                    // @ts-expect-error value prop exists
                    const { value }: { value: string } = target;

                    setValue('phone', formatPhone(value));

                    if (value.replace(/[^0-9]/g, '').length > 10) return;

                    setShowSignUp((prev) => (prev ? !prev : prev));
                  }}
                >
                  <FormLabel>{dic.labels[2]}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={'(123)-456-7890'}
                      {...field}
                      className="block w-full bg-secondary"
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
                {!showSignUp && (
                  <Button
                    disabled={isLoadingCode || !phoneRegex.test(field.value)}
                    className="mt-2 w-full text-white"
                    type="button"
                    onClick={handleSendCode}
                  >
                    {isLoadingCode ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      dic.phone.verify
                    )}
                  </Button>
                )}
              </>
            )}
          />
          {showSignUp && (
            <>
              <FormField
                control={control}
                name="code"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>{'Code'}</FormLabel>
                      <FormControl>
                        <div className="flex justify-between">
                          <CodeInput onChange={handleCodeChange} />
                          <ResendCodeButton
                            phone={getValues('phone')}
                            text="Resend"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    <Button
                      type="submit"
                      disabled={
                        isLoadingSignUp ||
                        !codeRegex.test(field.value) ||
                        !nameIsNotNull()
                      }
                      className="text-white"
                    >
                      {isLoadingSignUp ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        dic.button.text
                      )}
                    </Button>
                  </>
                )}
              />
            </>
          )}
          <Separator className="mx-auto w-[80%] min-w-[200px] bg-primary" />
          <GoogleLoginButton action="signUp" text={'Sign Up with Google'} />
        </div>
      </form>
    </Form>
  );
}
