import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { MoveLeftIcon } from "lucide-react";

export function ResetPassword({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your new password and confirm it
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">New password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="New password"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Confirm password</Label>
                  <Input
                    id="Confirm-password"
                    type="password"
                    placeholder="Confirm password"
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Confirm
                </Button>
              </div>
              <div className="text-center flex items-center justify-center text-sm gap-2">
                <MoveLeftIcon size={16} />
                Back to{" "}
                <Link href="login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our{" "}
        <Link href="#">Terms of Service</Link> and{" "}
        <Link href="#">Privacy Policy</Link>.
      </div>
    </div>
  );
}
