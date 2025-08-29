import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { moneta } from "moneta-kit";
import { moneta as monetaClient } from "@moneta-kit/react/client";

export default async function Home() {
  const { fetchIfAllowed } = moneta.authorize();
  const { allowed, data } = await fetchIfAllowed(() => prisma.posts.findMany());

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
          {!allowed ? (
            <>
              <monetaClient.PaywallOverlay href="/pricing">
                <ul className="space-y-3">
                  <li className="rounded border p-3">
                    <div className="font-semibold">Post title example</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Post preview content…</div>
                  </li>
                  <li className="rounded border p-3">
                    <div className="font-semibold">Post title example</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Post preview content…</div>
                  </li>
                  <li className="rounded border p-3">
                    <div className="font-semibold">Post title example</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Post preview content…</div>
                  </li>
                </ul>
              </monetaClient.PaywallOverlay>
              <p className="text-xs text-neutral-500 mt-2">
                Tip: append <code>?access=allow</code> to simulate paid access.
              </p>
            </>
          ) : (
            <>
              <ul className="space-y-3">
                {data.map((p: { id: number; title: string; content: string }) => (
                  <li key={p.id} className="rounded border p-3">
                    <div className="font-semibold">{p.title}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">{p.content}</div>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-neutral-500 mt-2">
                Tip: append <code>?access=deny</code> to simulate unpaid access.
              </p>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
