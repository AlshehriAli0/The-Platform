import prisma from "@/db/db";
import { createClient } from "../supabase/server";

export async function getIdByEmail() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const email = data?.user?.email;

  if (!email) throw new Error("User not found");

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (!user) throw new Error("User not found");
  return { user, id: user.id, userName: user.username };
}
