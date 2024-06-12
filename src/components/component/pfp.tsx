"use client";

import { useState } from "react";
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
  const [selectedFile, setSelectedFile] = useState<File>();
  const [previewSrc, setPreviewSrc] = useState<string>("/placeholder-user.jpg");


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file); 
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file); 
    }
  };

  const resetSelection = () => {
    setSelectedFile(undefined);
    setPreviewSrc("/placeholder-user.jpg");
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Add Profile Picture</CardTitle>
        <CardDescription>@{userName}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <Avatar className="h-24 w-24">
            <AvatarImage alt="@user" src={previewSrc} />
            <AvatarFallback>{userName?.charAt(0) ?? "U"}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex justify-center gap-2">
          <input
            id="file"
            name="file"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <label htmlFor="file" className="cursor-pointer">
            <Button variant="outline">Choose File</Button>
          </label>
          {selectedFile && (
            <Button variant="outline" onClick={resetSelection}>
              Reset
            </Button>
          )}
          <Button variant="ghost" onClick={resetSelection}>
            Not Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
