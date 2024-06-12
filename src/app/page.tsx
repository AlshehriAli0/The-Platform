import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/auth");
  }
  return <main>you are logged in</main>;
}
