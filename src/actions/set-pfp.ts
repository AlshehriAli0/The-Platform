"use server";

import prisma from "@/db/db";
import { getMimeTypeFromArrayBuffer } from "@/utils/helpers/refine";
import createClient from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

const setPfp = async (base64String: string, idIn: number) => {
  const buffer = Buffer.from(base64String, "base64").buffer;

  const schema = z.object({
    buffer: z
      .any()
      .refine(
        (buffer) =>
          buffer instanceof ArrayBuffer && Buffer.byteLength(buffer) <= 4000000,
        {
          message: "File is too large, must be less than 4MB",
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
    id: z.number({
      invalid_type_error: "ID must be a number",
      required_error: "ID is required",
    }),
  });

  const { buffer: validatedBuffer, id } = schema.parse({
    buffer,
    id: idIn,
  });
  try {
    const supabase = createClient();
    const mimeType = getMimeTypeFromArrayBuffer(validatedBuffer);

    const { data, error } = await supabase.storage
      .from("photos")
      .upload(
        `profile/${id}.${mimeType === "image/jpeg" ? "jpeg" : "png"}`,
        validatedBuffer,
        {
          contentType: "image/png" || "image/jpeg",
        },
      );

    if (!data || error) {
      return Promise.reject(new Error(error.message));
    }

    console.log("Avatar uploaded");

    await prisma.user.update({
      where: { id },
      data: { avatar: data.path },
    });

    console.log("Avatar updated");

    redirect("/");
  } catch (error) {
    console.error("Error:", error);
    return Promise.reject(error);
  }
};

export default setPfp;
