'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { MoveLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForgotPassword } from '@/hooks/auth-hooks/use-auth';
import { cn } from '@/lib/utils';
import { ForgotInputs, forgotSchema } from '@/lib/validation/auth';

import { CheckEmail } from './check-email';

export function ForgotPassword({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const [success, setSuccess] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');

  const form = useForm<ForgotInputs>({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: '',
    },
  });

  const { mutate, isPending } = useForgotPassword();

  const onSubmit = async (data: ForgotInputs) => {
    console.log('Forgot data', data);
    setEmailAddress(data.email);
    mutate(data, {
      onSuccess: () => {
        console.log('Forgot success');
        toast.success('Password reset email sent');
        setSuccess(true);
      },
      onError: () => {
        toast.error('Error sending password reset email');
      },
    });
  };

  if (success) {
    return <CheckEmail email={emailAddress} />;
  }
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Forgot Password</CardTitle>
          <CardDescription>
            No worries we will send you an email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="email">Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="m@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isPending}
                    isLoading={isPending}
                  >
                    Send
                  </Button>
                </div>
                <div className="flex items-center justify-center gap-2 text-center text-sm">
                  <MoveLeftIcon size={16} />
                  Back to{' '}
                  <Link href="login" className="underline underline-offset-4">
                    Login
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground [&_a]:hover:text-primary text-center text-xs text-balance [&_a]:underline [&_a]:underline-offset-4">
        By clicking continue, you agree to our{' '}
        <Link href="#">Terms of Service</Link> and{' '}
        <Link href="#">Privacy Policy</Link>.
      </div>
    </div>
  );
}
