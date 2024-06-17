import React from "react";
import FeedGrid from "./feed-grid";
import createClient from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getIdByEmail } from "@/utils/helpers/get-by-mail";

export default async function Feed() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/auth/sign-up");
  }

  const user = data?.user;

  if (!user || !user.email) {
    redirect("/auth/sign-in");
  }

  const { userName: un } = await getIdByEmail({ email: user?.email });
  // Fetch posts from the server so that root page can display skeleton
  // while the data is loading
  return (
    <main className="h-screen w-full">
      <FeedGrid userName={un} />
    </main>
  );
}
