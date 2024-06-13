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

type Props = {
  setLogIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export function LoginModule({ setLogIn }: Props) {
  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
          <CardDescription>
            Enter your credentials to sign in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="m@example.com"
              required
              type="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input minLength={8} id="password" required type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Log In</Button>
        </CardFooter>
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
