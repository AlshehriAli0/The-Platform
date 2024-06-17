export type Post = {
  id: number;
  image: string;
  caption: string;
  authorId: number;
  created_at: string;
  updated_at: string;
};

export type Posts = {
  posts: Post[];
};
