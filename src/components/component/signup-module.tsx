"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signUpAction } from "@/actions/sign-up";
import { useServerAction } from "zsa-react";
import { BarLoader } from "react-spinners";

type Props = {
  setLogIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export function SignModule({ setLogIn }: Props) {
  const { isPending, executeFormAction, isSuccess, data, isError, error } =
    useServerAction(signUpAction);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-lg dark:bg-gray-950">
        <div className="space-y-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Create your account to get started.
            </p>
          </div>
          <form action={executeFormAction} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  type="text"
                  id="firstName"
                  placeholder="John"
                  name="firstName"
                  minLength={3}
                  required
                  disabled={isPending}
                  className="text-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  className="text-lg"
                  type="text"
                  placeholder="Doe"
                  minLength={3}
                  name="lastName"
                  required
                  disabled={isPending}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="example@email.com"
                className="text-lg"
                required
                type="email"
                name="email"
                disabled={isPending}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="johndoe123"
                required
                className="text-lg"
                type="text"
                name="username"
                disabled={isPending}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                required
                type="password"
                className="text-lg"
                minLength={8}
                placeholder="Password"
                name="password"
                disabled={isPending}
              />
            </div>
            {error && <p className="text-sm text-red-600">{error.message}</p>}
            <Button className="w-full" type="submit" disabled={isPending}>
              {isPending ? <BarLoader color="white" /> : "Sign Up"}
            </Button>
          </form>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            Already a user?
            <p
              className="cursor-pointer font-semibold underline transition-all hover:text-black"
              onClick={() => setLogIn(true)}
            >
              Log in
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
