export type Post = {
  id: number;
  author: Author;
  image: string;
  caption: string | null;
  authorId: number;
  created_at: Date;
  updated_at: Date | null;
};

export type Author = {
  id: number;
  username: string;
  avatar: string;
};

export type Posts = {
  posts: Post[];
};
