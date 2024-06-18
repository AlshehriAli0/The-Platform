import createClient from "@/utils/supabase/server";
import prisma from "@/db/db";
import { Post, Posts } from "./types";

export const fetchPosts = async (page: number) => {
  try {
    const supabase = createClient();
    const posts = await prisma?.post.findMany({
      skip: page * 6,
      take: 6,
      orderBy: {
        created_at: "desc",
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    if (!posts) {
      throw new Error("No posts found");
    }

    const imagePaths = posts.map((post) => post.image);
    if (typeof imagePaths === "undefined") {
      throw new Error("No image paths found");
    }

    const uniqueUsers = Array.from(
      new Set(posts.map((post) => post.author.id)),
    ).map((id) => posts.find((post) => post.author.id === id)?.author);

    const avatarPaths = uniqueUsers.map((user) => user?.avatar) as string[];

    const { data: imageUrlsData, error: imageUrlsError } =
      await supabase.storage.from("photos").createSignedUrls(imagePaths, 3600);

    if (imageUrlsError || !imageUrlsData) {
      console.error("Error generating signed URLs for images:", imageUrlsError);
      throw new Error("Error generating signed URLs for images");
    }

    const { data: avatarUrlsData, error: avatarUrlsError } =
      await supabase.storage.from("photos").createSignedUrls(avatarPaths, 3600);

    if (avatarUrlsError || !avatarUrlsData) {
      console.error(
        "Error generating signed URLs for avatars:",
        avatarUrlsError,
      );
      throw new Error("Error generating signed URLs for avatars");
    }
    const userAvatarUrls = uniqueUsers.reduce((acc: any, user, index) => {
      if (!user?.id) {
        return acc;
      }

      acc[user.id] = avatarUrlsData[index].signedUrl;
      return acc;
    }, {});

    const postsWithImages = posts.map((post, index) => ({
      ...post,
      image: imageUrlsData[index].signedUrl || post.image,
      author: {
        ...post.author,
        avatar: userAvatarUrls[post.author.id] as string,
      },
    }));
    return {
      posts: postsWithImages,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
