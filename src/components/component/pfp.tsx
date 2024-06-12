"use client";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function Pfp({ userName }: { userName: string | undefined }) {
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Add Profile Picture</CardTitle>
        <CardDescription>@{userName}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <Avatar className="h-24 w-24">
            <AvatarImage alt="@user" src="/placeholder-user.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex justify-center gap-2">
          <Button variant="outline">Upload</Button>
          <Button variant="ghost">Not Now</Button>
        </div>
      </CardContent>
    </Card>
  );
}
