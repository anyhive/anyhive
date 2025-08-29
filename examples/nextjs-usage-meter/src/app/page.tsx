"use client";

import { useState } from "react";
import { useMeteredAction } from "@moneta-kit/react";
import { UsageMeter, UsageGate, UpgradeButton } from "@moneta-kit/react/client";

export default function Home() {
  const [response, setResponse] = useState<string | null>(null);

  const action = async () => {
    // simulate an LLM call
    await new Promise((r) => setTimeout(r, 200));
    return "Hello from LLM!";
  };

  const { run, allowed, usage } = useMeteredAction(action, { cost: 5 });

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[16px] row-start-2 items-center sm:items-start w-full max-w-2xl">
        <h1 className="text-xl font-semibold">Usage Meter Demo</h1>
        <UsageMeter used={usage.used} limit={usage.limit} />
        <div className="flex items-center gap-2">
          <button
            className="rounded bg-blue-600 text-white px-3 py-2 text-sm hover:bg-blue-700"
            onClick={async () => {
              const res = await run();
              if (res.ok) setResponse(res.result as string);
            }}
          >
            Call LLM (cost 5)
          </button>
          <button
            className="rounded border px-3 py-2 text-sm"
            onClick={() => usage.reset()}
          >
            Reset
          </button>
        </div>
        <UsageGate
          allowed={allowed}
          fallback={
            <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 flex items-center gap-3">
              Quota exceeded. Please upgrade.
              <UpgradeButton href="/pricing" />
            </div>
          }
        >
          {response && (
            <div className="rounded border p-3 text-sm bg-white/70">{response}</div>
          )}
        </UsageGate>
      </main>
    </div>
  );
}
