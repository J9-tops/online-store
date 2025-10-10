"use client";

import {
  forgotPasswordAction,
  resetPasswordAction,
} from "@/actions/change-password";
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
import { cn } from "@/lib/utils";
import { switchMode } from "@/redux/features/modals";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Spinner } from "./ui/spinner";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const dispatch = useDispatch();
  const handleSwitchMode = () => {
    dispatch(switchMode("login"));
  };

  const router = useRouter();

  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    if (!showPassword) {
      setPending(true);
      const { error } = await forgotPasswordAction(formData);
      if (error) {
        toast.error(error);
        setPending(false);
      } else {
        setPending(false);
        setShowPassword(true);
      }
    } else {
      setPending(true);
      const data = Object.fromEntries(formData);
      console.log(data);

      const { error } = await resetPasswordAction(formData);
      if (error) {
        toast.error(error);
        setPending(false);
      } else {
        setPending(false);
        router.refresh();
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Forgot Your Password</CardTitle>
          <CardDescription>Change your password now</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                {showPassword && (
                  <>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        required
                        name="password"
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="token">Token</Label>
                      </div>
                      <Input id="token" type="password" required name="token" />
                    </div>
                  </>
                )}
                <Button
                  type="submit"
                  className="w-full flex items-center gap-2"
                  disabled={pending}
                >
                  {pending && (
                    <span>
                      <Spinner />
                    </span>
                  )}
                  <span>Submit</span>
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <button
                  onClick={handleSwitchMode}
                  className="underline underline-offset-4"
                >
                  Sign up
                </button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
