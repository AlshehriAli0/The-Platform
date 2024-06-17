"use client";

import React from "react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { logInAction } from "@/actions/login";
import { useServerAction } from "zsa-react";
import { BarLoader } from "react-spinners";

type Props = {
  setLogIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export function LoginModule({ setLogIn }: Props) {
  const { isPending, executeFormAction, isSuccess, data, isError, error } =
    useServerAction(logInAction);
  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
          <CardDescription>
            Enter your credentials to sign in to your account.
          </CardDescription>
        </CardHeader>
        <form action={executeFormAction}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                className="text-lg"
                id="email"
                placeholder="m@example.com"
                required
                type="email"
                name="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                className="text-lg"
                minLength={8}
                id="password"
                name="password"
                type="password"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? <BarLoader color="white" /> : "Log In"}
            </Button>
            {error && <p className="text-sm text-red-600">{error.message}</p>}
          </CardFooter>
        </form>
        <div className="mb-4 text-center text-sm text-gray-500 dark:text-gray-400">
          New user?
          <p
            className="cursor-pointer font-semibold underline transition-all hover:text-black"
            onClick={() => setLogIn(false)}
          >
            Sign up
          </p>
        </div>
      </Card>
    </div>
  );
}
