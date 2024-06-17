import createClient from "@/utils/supabase/server";
import prisma from "@/db/db";

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
        author: true,
      },
    });

    if (!posts) {
      return page;
    }

    const imagePaths = posts.map((post) => post.image);
    if (typeof imagePaths === "undefined") {
      return page;
    }

    const uniqueUsers = Array.from(
      new Set(posts.map((post) => post.author.id)),
    ).map((id) => posts.find((post) => post.author.id === id)?.author);

    const avatarPaths = uniqueUsers.map((user) => user?.avatar) as string[];

    const { data: imageUrlsData, error: imageUrlsError } =
      await supabase.storage.from("photos").createSignedUrls(imagePaths, 3600);

    if (imageUrlsError || !imageUrlsData) {
      console.error("Error generating signed URLs for images:", imageUrlsError);
      return { posts: [], avatars: {} };
    }

    const { data: avatarUrlsData, error: avatarUrlsError } =
      await supabase.storage.from("photos").createSignedUrls(avatarPaths, 3600);

    if (avatarUrlsError || !avatarUrlsData) {
      console.error(
        "Error generating signed URLs for avatars:",
        avatarUrlsError,
      );
      return { posts: [], avatars: {} };
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
        avatar: userAvatarUrls[post.author.id],
      },
    }));
    return {
      posts: postsWithImages,
    };
  } catch (error) {
    console.log(error);
    return page;
  }
};
