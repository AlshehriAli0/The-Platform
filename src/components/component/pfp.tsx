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
import BarLoader from "react-spinners/BarLoader";

export function Pfp({ userName, id }: { userName: string; id: number }) {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [previewSrc, setPreviewSrc] = useState<string>("/placeholder-user.jpg");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      e.target.value = "";
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

  const savePfp = async (formData: FormData) => {
    const file = formData.get("file") as File;

    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString("base64");
      setLoading(true);
      await setPfp(base64, id);
      setError("");
    } catch (err) {
      setError("An unknown error occurred.");
      setLoading(false);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
    setLoading(false);
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
          <form action={savePfp} className="flex justify-center gap-2">
            {!selectedFile ? (
              <label
                htmlFor="file"
                className="inline-flex h-10 cursor-pointer items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium outline outline-1 outline-black/10 ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                Upload
              </label>
            ) : (
              <Button disabled={loading} type="submit" variant="default">
                {loading ? <BarLoader color="white" width={70} /> : "Use Photo"}
              </Button>
            )}
            <input
              id="file"
              name="file"
              type="file"
              defaultValue={previewSrc}
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={handleFileChange}
            />
          </form>

          {selectedFile ? (
            <Button
              variant="outline"
              disabled={loading}
              onClick={resetSelection}
            >
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
