import CreatePostBtn from "@/components/create-post-btn";
import { getIdByEmail } from "@/utils/helpers/get-by-mail";
import createClient from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/auth/sign-up");
  }
  const email = data?.user?.email as string;
  const { userName } = await getIdByEmail({ email });

  return (
    <main className="h-screen w-full text-black">
      <h1>you are logged in</h1>
      <CreatePostBtn userName={userName} />
    </main>
  );
}
