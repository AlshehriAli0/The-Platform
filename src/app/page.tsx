import CreatePostBtn from "@/components/create-post-btn";
import SignOutBtn from "@/components/sign-out-btn";
import createClient from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/auth/sign-up");
  }


  return (
    <main className="h-screen w-full text-black">
      <h1>you are logged in</h1>
      <CreatePostBtn />
    </main>
  );
}
