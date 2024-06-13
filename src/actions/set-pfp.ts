"use server";

import prisma from "@/db/db";
import createClient from "@/utils/supabase/server";
import { decode } from "base64-arraybuffer";
import { redirect } from "next/navigation";

const setPfp = async (buffer: string, id: number) => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.storage
      .from("photos")
      .upload(`profile/${id}.png`, decode(buffer), {
        contentType: "image/png" || "image/jpeg",
      });

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
