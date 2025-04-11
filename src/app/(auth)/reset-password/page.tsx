import Image from "next/image";
import Link from "next/link";
import React from "react";
import MettuLogo from "@/../public/logo/mettuLogo.png";
import { ResetPassword } from "@/components/auth/reset-password-form";

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="#"
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="flex  items-center justify-center rounded-md text-primary-foreground">
            <Image src={MettuLogo} alt="logo" width={50} height={50} />
          </div>
          Mattu University ERMS
        </Link>
        <ResetPassword />
      </div>
    </div>
  );
}
