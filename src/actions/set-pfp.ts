import { z, ZodError, ZodIssue } from "zod";
import prisma from "@/db/db";
import { getIdByEmail } from "@/utils/helpers/get-by-mail";
import { createClient } from "@/utils/supabase/server";

interface SetPfpInput {
  imgFile: File;
}

const setPfp = async (input: SetPfpInput): Promise<void> => {
  try {
    const schema = z.object({
      imgFile: z
        .instanceof(File)
        .refine(
          (file) => file.size < 1024 * 1024 * 2 && file.type === "image/png",
          { message: "File must be an image and less than 2MB" },
        ),
    });

    const result = schema.safeParse(input);

    if (!result.success) {
      const firstIssue: ZodIssue = result.error.issues[0];
      return Promise.reject(new Error(firstIssue.message));
    }

    const { imgFile } = result.data;

    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data || !data.user) {
      return Promise.reject(new Error("No user found"));
    }

    const email = data.user.email;
    if (!email) {
      return Promise.reject(new Error("No email found"));
    }

    const { id } = await getIdByEmail({ email });

    const { data: storageData, error: storageError } = await supabase.storage
      .from("photos")
      .upload(`profile/${id}.png`, imgFile);

    if (storageError || !storageData) {
      return Promise.reject(new Error("Error uploading avatar"));
    }

    console.log("Avatar uploaded");

    await prisma.user.update({
      where: { id },
      data: { avatar: storageData.path },
    });

    console.log("Avatar updated");
  } catch (error) {
    console.error("Error:", error);
    return Promise.reject(error);
  }
};

export default setPfp;
