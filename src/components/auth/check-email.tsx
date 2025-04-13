'use client';

import { MoveLeft, MoveLeftIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import Logo from '@/../public/logo/mettuLogo.png';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useForgotPassword } from '@/hooks/auth-hooks/use-auth';
import { cn } from '@/lib/utils';

export function CheckEmail({
  className,
  email,
  ...props
}: Readonly<React.ComponentPropsWithoutRef<'div'>> & { email: string }) {
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState<number | undefined>();

  const { mutate, isPending } = useForgotPassword();

  const handleResend = () => {
    mutate(
      { email },
      {
        onSuccess: response => {
          console.log('successfully sent to your email:', response);
          toast.success('successfully sent to your email');
          setResending(true);
          setTimer(30);
        },
        onError: error => {
          console.error('email verification failed:', error);
          toast.error('email verification failed');
        },
      },
    );
  };

  useEffect(() => {
    if (timer === undefined) return;

    const countdown = setInterval(() => {
      setTimer(previousTimer => {
        if (previousTimer === undefined) return;
        if (previousTimer <= 1) {
          clearInterval(countdown);
          setResending(false);
          return;
        }
        return previousTimer - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  const handleOpenEmail = () => {
    const emailClients = {
      gmail: 'https://mail.google.com',
      outlook: 'https://outlook.live.com',
      yahoo: 'https://mail.yahoo.com',
    };

    const domain = email.split('@')[1];

    let emailUrl = emailClients.gmail;

    if (domain?.includes('gmail')) {
      emailUrl = emailClients.gmail;
    } else if (domain?.includes('outlook') || domain?.includes('hotmail')) {
      emailUrl = emailClients.outlook;
    } else if (domain?.includes('yahoo')) {
      emailUrl = emailClients.yahoo;
    }

    window.open(emailUrl, '_blank');
  };

  return (
    <>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Check your Email</CardTitle>
          <CardDescription>
            we have sent a password reset link to
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-6">
              <Button
                type="submit"
                className="w-full"
                onClick={handleOpenEmail}
                disabled={isPending}
                isLoading={isPending}
              >
                Open Email App
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
        </CardContent>
      </Card>
      <div className="text-muted-foreground [&_a]:hover:text-primary text-center text-xs text-balance [&_a]:underline [&_a]:underline-offset-4">
        By clicking continue, you agree to our{' '}
        <Link href="#">Terms of Service</Link> and{' '}
        <Link href="#">Privacy Policy</Link>.
      </div>
    </>
  );
}
