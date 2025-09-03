export type Post = {
  id: number;
  title: string;
  content: string;
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const prisma = {
  // Prisma-like API surface for demo purposes
  posts: {
    async findMany(): Promise<Post[]> {
      await delay(150);
      return [
        { id: 1, title: "Hello Prisma-less", content: "This is a demo post." },
        { id: 2, title: "Another Post", content: "Access gated by anyhive-kit." },
        { id: 3, title: "Third Post", content: "This is the third demo post." },
        { id: 4, title: "Fourth Post", content: "Learning Next.js with Prisma-like API." },
        { id: 5, title: "Fifth Post", content: "Anyhive-kit makes access control easy." },
        { id: 6, title: "Sixth Post", content: "TypeScript is awesome for safety." },
        { id: 7, title: "Seventh Post", content: "Demo post number seven." },
        { id: 8, title: "Eighth Post", content: "Building apps is fun!" },
        { id: 9, title: "Ninth Post", content: "Almost at ten demo posts." },
        { id: 10, title: "Tenth Post", content: "This is the last of the ten demo posts." },
      ];
    },
  },
};

