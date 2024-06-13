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
import React from "react";
import setPfp from "@/actions/set-pfp";

export function Pfp({ userName }: { userName: string | undefined }) {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [previewSrc, setPreviewSrc] = useState<string>("/placeholder-user.jpg");
  const [error, setError] = useState<string>("");

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
    setError("");
  };

  const savePfp = async () => {
    if (!selectedFile) {
      return;
    }
    try {
      setError("");
      await setPfp({ imgFile: selectedFile });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Add Profile Picture</CardTitle>
        <CardDescription>@{userName}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <Avatar className="h-24 w-24 outline outline-black/10">
            <AvatarImage alt="@user" src={previewSrc} />
            <AvatarFallback>{userName?.charAt(0) ?? "U"}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex justify-center gap-2">
          {!selectedFile ? (
            <React.Fragment>
              <label
                htmlFor="file"
                className="inline-flex h-10 cursor-pointer items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium outline outline-1 outline-black/10 ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                Upload
              </label>
              <input
                id="file"
                name="file"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </React.Fragment>
          ) : (
            <Button onClick={savePfp} variant={"default"}>
              Use Photo
            </Button>
          )}

          {selectedFile ? (
            <Button variant="outline" onClick={resetSelection}>
              Reset
            </Button>
          ) : (
            <Button variant="ghost" onClick={resetSelection}>
              Not Now
            </Button>
          )}
        </div>
        {error && <h1 className="mt-4 text-center text-red-600">{error}</h1>}
      </CardContent>
    </Card>
  );
}
