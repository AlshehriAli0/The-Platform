import React from "react";
import FeedGrid from "./feed-grid";
import createClient from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getIdByEmail } from "@/utils/helpers/get-by-mail";
import { fetchPosts } from "@/lib/fetch-posts";
import FeedCards from "./component/feed-cards";
import { Post, Posts } from "@/lib/types";

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
  const { posts } : Posts = await fetchPosts(0);


  return (
    <main className="h-screen w-full">
      <FeedGrid userName={un} />
      <FeedCards posts={posts} />
    </main>
  );
}
