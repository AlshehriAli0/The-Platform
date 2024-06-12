"use server";

import { createServerAction } from "zsa";
import z from "zod";

export const signUpAction = createServerAction()
  .input(
    z.object({
      email: z.string().email(),
      password: z.string().min(8),
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
  });
