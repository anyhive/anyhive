import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { paywall } from "@anyhive-kit/react/server";
import "@anyhive-kit/react/styles.css";
// import "@anyhive-kit/react/themes/neobrutal.css";

type Post = {
  id: number;
  title: string;
  content: string;
};

export default async function Home() {
  // const posts: Post[] = await prisma.posts.findMany();
  const { render } = await paywall(() => prisma.posts.findMany());

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-2xl">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <section className="w-full">
          <h2 className="text-lg font-semibold mb-2">Posts</h2>
          {render((posts: Post[]) => (
            <ul className="space-y-3">
              {posts.map((p: Post) => (
                <li key={p.id} className="rounded border p-3">
                  <div className="font-semibold">{p.title}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{p.content}</div>
                </li>
              ))}
            </ul>
          ))}
        </section>
      </main>
    </div>
  );
}
