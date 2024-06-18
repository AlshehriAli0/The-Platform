import React from "react";
import { FeedCard } from "./feed-card";
import type { Post } from "@/lib/types";

type Props = {
  posts: Post[];
};

export default function FeedCards({ posts }: Props) {
  return (
    <React.Fragment>
      {posts.map((post, index: number) => (
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
