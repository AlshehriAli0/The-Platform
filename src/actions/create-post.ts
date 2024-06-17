"use server";
import { getMimeTypeFromArrayBuffer } from "@/utils/helpers/refine";
import { z } from "zod";
import { createServerAction } from "zsa";
import createClient from "@/utils/supabase/server";
import { v4 as uuidv4 } from "uuid";

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
      caption: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    const { image, caption } = input;
    try {
      const mimeType = getMimeTypeFromArrayBuffer(image);

      const supabase = createClient();
      const { data, error } = await supabase.storage
        .from("photos")
        .upload(
          `posts/${uuidv4()}.${mimeType === "image/jpeg" ? "jpeg" : "png"}`,
          image,
          {
            contentType: "image/png" || "image/jpeg",
          },
        );
    } catch (error) {
      console.error("Error:", error);
      return Promise.reject(error);
    }
  });
