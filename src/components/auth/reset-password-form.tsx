import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, MoveLeftIcon } from 'lucide-react';
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
import { useResetPassword } from '@/hooks/auth-hooks/use-auth';
import { cn } from '@/lib/utils';
import { ResetInputs, resetSchema } from '@/lib/validation/auth';

export function ResetPassword({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<ResetInputs>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const { mutate, isPending } = useResetPassword();

  const onSubmit = async (data: ResetInputs) => {
    console.log('Reset data', data);
    mutate(data, {
      onSuccess: () => {
        toast.success('Reset password successfully');
      },
      onError: () => {
        toast.error('Failed to reset password');
      },
    });
  };
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your new password and confirm it
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">New password</Label>
                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative flex items-center gap-2">
                              <Input
                                type={showPassword ? 'text' : 'password'}
                                placeholder=""
                                {...field}
                              />
                              {showPassword ? (
                                <EyeOff
                                  size={16}
                                  className="absolute right-5 cursor-pointer"
                                  onClick={() => setShowPassword(false)}
                                />
                              ) : (
                                <Eye
                                  size={16}
                                  className="absolute right-5 cursor-pointer"
                                  onClick={() => setShowPassword(true)}
                                />
                              )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Confirm password</Label>
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative flex items-center gap-2">
                              <Input
                                type={showPassword ? 'text' : 'password'}
                                placeholder=""
                                {...field}
                              />
                              {showPassword ? (
                                <EyeOff
                                  size={16}
                                  className="absolute right-5 cursor-pointer"
                                  onClick={() => setShowPassword(false)}
                                />
                              ) : (
                                <Eye
                                  size={16}
                                  className="absolute right-5 cursor-pointer"
                                  onClick={() => setShowPassword(true)}
                                />
                              )}
                            </div>
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
                    Confirm
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
