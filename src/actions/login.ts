"use server";

import { ZodError, ZodIssue } from "zod";
import { createServerAction } from "zsa";
import z from "zod";
import prisma from "@/db/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { noWhitespace } from "@/utils/helpers/refine";
import createClient from "@/utils/supabase/server";

export const logInAction = createServerAction()
  .input(
    z.object({
      email: z
        .string()
        .email({ message: "Invalid email format" })
        .refine((str) => noWhitespace(str), {
          message: "Email must not contain spaces",
        }),
      password: z
        .string()
        .min(8, { message: "Password is too short" })
        .refine((str) => noWhitespace(str), {
          message: "Password must not contain spaces",
        }),
    }),
    {
      type: "formData",
    },
  )
  .onInputParseError(async (error) => {
    if (error instanceof ZodError) {
      const issues: ZodIssue[] = error.issues;
      const firstIssue = issues[0];
      throw new Error(firstIssue.message);
    }
  })
  .handler(async ({ input }) => {
    const { email, password } = input;

    const emailExists = await prisma.user.findUnique({
      where: { email },
    });

    if (!emailExists) {
      throw new Error("Email not found try signing up");
    }

    const supabase = createClient();
    const data = {
      email,
      password,
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
      throw new Error(error.message);
    }
    revalidatePath("/", "layout");
    redirect("/");
  });
