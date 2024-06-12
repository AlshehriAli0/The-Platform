"use server";

import { ZodError, ZodIssue } from "zod";
import { createServerAction } from "zsa";
import z from "zod";
import prisma from "@/db/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import supabase from "@/db/client";

export const signUpAction = createServerAction()
  .input(
    z.object({
      email: z.string().email(),
      password: z.string().min(8, { message: "Password is too short" }),
      firstName: z.string().min(3, { message: "First name is too short" }),
      lastName: z.string().min(3, { message: "Last name is too short" }),
      username: z.string(),
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
    const { email, password, firstName, lastName, username } = input;

    const emailExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    const usernameExists = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (emailExists) {
      throw new Error("Email already exists try logging in");
    }

    if (usernameExists) {
      throw new Error("Username already exists try logging in");
    }

    const data = {
      email,
      password,
    };
    const { error } = await supabase.auth.signUp(data);

    if (error) {
      throw new Error(error.message);
    }

    const user = await prisma.user.create({
      data: {
        email,
        f_name: firstName,
        l_name: lastName,
        username,
      },
    });

    if (!user) {
      throw new Error("User not created");
    }
    console.log("User created");

    revalidatePath("/", "layout");
    redirect("/auth/complete-signup");
  });
