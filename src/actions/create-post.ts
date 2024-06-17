"use server";

import { getMimeTypeFromArrayBuffer } from "@/utils/helpers/refine";
import { z } from "zod";
import { createServerAction } from "zsa";
import createClient from "@/utils/supabase/server";
import { v4 as uuidv4 } from "uuid";
import { getIdByEmail } from "@/utils/helpers/get-by-mail";
import { revalidatePath } from "next/cache";

export const createPost = createServerAction()
  .input(
    z.object({
      image: z
        .string()
        .transform((str) => Buffer.from(str, "base64").buffer)
        .refine(
          (buffer) =>
            buffer instanceof ArrayBuffer &&
            Buffer.byteLength(buffer) <= 10000000,
          {
            message: "File is too large, must be less than 10MB",
          },
        )
        .refine(
          (buffer) => {
            const mimeType = getMimeTypeFromArrayBuffer(buffer);
            return mimeType === "image/png" || mimeType === "image/jpeg";
          },
          {
            message: "File must be a PNG or JPEG image",
          },
        ),
      caption: z.string().refine((str) => str.length <= 200, {
        message: "Caption must be less than 200 characters",
      }),
    }),
  )
  .handler(async ({ input }) => {
    const { image, caption } = input;

    try {
      const mimeType = getMimeTypeFromArrayBuffer(image);

      const supabase = createClient();
      console.log("supabase connected");
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (!user || userError) {
        throw new Error("User not logged in");
      }

      const { data, error } = await supabase.storage
        .from("photos")
        .upload(
          `posts/${uuidv4()}.${mimeType === "image/jpeg" ? "jpeg" : "png"}`,
          image,
          {
            contentType: mimeType === "image/jpeg" ? "image/jpeg" : "image/png",
          },
        );
      if (error || !data) {
        throw new Error("Error uploading file");
      }

      const email = user.user?.email as string;
      const { id: userId } = await getIdByEmail({ email });

      await prisma?.post.create({
        data: {
          authorId: userId,
          image: data.path,
          caption,
        },
      });
      revalidatePath("/", "layout");
      return { data: true };
    } catch (error) {
      console.error("Error updating recipient:", error);
      return {
        data: false,
        error: "Too many requests please try again later",
      };
    }
  });
