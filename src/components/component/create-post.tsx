"use client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useState } from "react";
import { LuUndo2 } from "react-icons/lu";
import { CircularProgressbar } from "react-circular-progressbar";
import { createPost } from "@/actions/create-post";
import { useServerAction } from "zsa-react";
import { BarLoader } from "react-spinners";

export function CreatePost(props: {
  userName: string;
  setShow: (show: boolean) => void;
}) {
  const { isPending, execute, isSuccess, data, isError, error } =
    useServerAction(createPost);

  const [image, setImage] = useState<File>();
  const [previewSrc, setPreviewSrc] = useState<string>("/placeholder.svg");
  const [chars, setChars] = useState<number>(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      e.target.value = "";
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetSelection = () => {
    setImage(undefined);
    setPreviewSrc("/placeholder.svg");
  };

  const countChars = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const chars = (e.target.value.length / 200) * 100;
    setChars(chars);
  };

  const getColor = (percentage: number) => {
    return percentage > 90 ? "crimson" : "black";
  };

  const savePost = async (formData: FormData) => {
    if (!image) {
      return;
    }
    const caption = formData.get("caption") as string;

    console.log(image);
    console.log(caption);

    try {
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString("base64");
      console.log("is  sent");
      const result = await execute({ image: base64, caption });
      if (result[1]) {
        console.error(result[1]);
      } else {
        console.log(result[0]);
        props.setShow(false); 
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed mx-auto px-4 py-8 sm:scale-110 sm:px-6 lg:px-8">
      <div className="rounded-lg border bg-white p-6 shadow-md dark:bg-gray-950">
        <h2 className="mb-4 flex justify-between text-2xl font-bold">
          New Post
          <Button
            onClick={() => props.setShow(false)}
            className="h-1 w-1 p-4"
            variant="outline"
            disabled={isPending}
          >
            X
          </Button>
        </h2>
        <form action={savePost} className="grid gap-6">
          <div>
            <Label
              className="mb-2 block font-medium opacity-50"
              htmlFor="image"
            >
              Add an Image and Caption to post on
              <span className="font-bold"> @{props.userName}</span>
            </Label>
            <div className="relative">
              <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-lg dark:bg-gray-800">
                <Image
                  alt="Preview"
                  className="h-full w-full border-2 border-black/5 object-cover"
                  height={400}
                  src={previewSrc}
                  style={{
                    aspectRatio: "400/400",
                    objectFit: "cover",
                  }}
                  width={400}
                />
              </div>
              {!image ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="sm" variant="outline">
                    <UploadIcon className="mr-2 h-5 w-5" />
                    Upload Image
                  </Button>
                </div>
              ) : (
                <div className="absolute right-2 top-2 z-10 flex items-center justify-center">
                  <Button
                    disabled={isPending}
                    onClick={resetSelection}
                    size="sm"
                    variant="outline"
                  >
                    <LuUndo2 />
                  </Button>
                </div>
              )}
              <input
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                id="image"
                name="image"
                type="file"
                accept={"image/png, image/jpeg"}
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div>
            <Label
              className="mb-1 flex items-center justify-between p-1 font-medium"
              htmlFor="caption"
            >
              Caption
              <CircularProgressbar
                value={chars}
                className="text-black"
                strokeWidth={22}
                styles={{
                  root: {
                    width: "24px",
                  },
                  path: {
                    stroke: getColor(chars),
                    transition: "stroke-dashoffset 0.2s ease 0s",
                  },
                  trail: {
                    stroke: "ghostwhite",
                  },
                }}
              />
            </Label>
            <Textarea
              name="caption"
              onChange={countChars}
              className="focus:ring-primary-500 dark:focus:ring-primary-400 w-full rounded-lg border border-gray-300 p-2 text-[16px] transition-all focus:outline-none focus:ring-2 dark:border-gray-700"
              id="caption"
              placeholder="Add a caption..."
              maxLength={200}
            />
          </div>
          {error && (
            <div className="text-sm text-red-500">
              {error?.message ?? "Something went wrong"}
            </div>
          )}

          <Button disabled={isPending} className="w-full" type="submit">
            {isPending ? <BarLoader color="white" /> : "Post"}
          </Button>
        </form>
      </div>
    </div>
  );
}

function UploadIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
