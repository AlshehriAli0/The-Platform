import React from "react";
import { FeedCard } from "./feed-card";
import { Post } from "@/lib/types";

export default function FeedCards(posts: any) {
  return (
    <React.Fragment>
      {posts.map((post: Post, index: number) => (
        <FeedCard
          key={index}
          image={post.image}
          caption={post.caption || ""}
          avatar={post.author.avatar}
          userName={post.author.username}
          time={post.created_at}
        />
      ))}
    </React.Fragment>
  );
}
