"use server";

import { createServerAction } from "zsa";
import z from "zod";
import prisma from "@/db/db";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type errObjType = {
  upperCase: { pass: boolean; message: string };
  lowerCase: { pass: boolean; message: string };
  specialCh: { pass: boolean; message: string };
  totalNumber: { pass: boolean; message: string };
};

export const signUpAction = createServerAction()
  .input(
    z.object({
      email: z.string().email(),
      password: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      username: z.string(),
    }),

    {
      type: "formData",
    },
  )
  .handler(async ({ input }) => {
    const { email, password, firstName, lastName, username } = input;

    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      const emailExists = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (emailExists) {
        throw new Error("Email already exists try logging in");
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

      const supabase = createClient();
      const data = {
        email,
        password,
      };
      const { error } = await supabase.auth.signUp(data);

      if (error) {
        throw new Error(error.message);
      }

      console.log("User created");

      revalidatePath("/", "layout");
      redirect("/");
    } catch (error) {
      throw new Error("Error creating user");
    }
  });
