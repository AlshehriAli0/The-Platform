import prisma from "@/db/db";

export async function getIdByEmail({ email }: { email: string }) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) throw new Error("User not found");
    return { user, id: user.id, userName: user.username };
  } catch (error) {
    console.error("Error:", error);
    return Promise.reject(error);
  }
}
