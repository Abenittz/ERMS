import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import MettuLogo from '@/../public/logo/mettuLogo.png';
import { LoginForm } from '@/components/auth/login-form';

export default function Page() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="#"
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="text-primary-foreground flex items-center justify-center rounded-md">
            <Image src={MettuLogo} alt="logo" width={50} height={50} />
          </div>
          Mattu University ERMS
        </Link>
        <LoginForm />
      </div>
    </div>
  );
}
