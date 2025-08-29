# Moneta Kit

Build your product. We handle payments, billing, and compliance.

Moneta Kit is an open-source, developer-first Merchant of Record (MoR) and billing layer. We give product teams a PSP‑agnostic payment stack, modern metered/paywall tooling, and compliance built‑in — so you can ship faster without vendor lock‑in.

> **The open-source Merchant of Record for developers.**
> Open-source billing — pricing, metering, and compliance made simple.

- PSP‑agnostic by design: Bring your own PSPs (Stripe, PayPal, PayPay, LINE Pay, Momo…) and switch with confidence.
- Server‑first access control: RSC/SSR‑friendly paywall with one‑line gating (`paywall().render`) or explicit `fetchIfAllowed`.
- Metered billing for tools & AI: quotas, rate limits, overage prompts, and guided upgrades.
- Compliance from day one: Tax/VAT/GST/JCT ready, with region‑specific modules on the roadmap.
- Open, portable, and programmable: Your data, your PSPs, your rules.

Scales your startup from Hello World to IPO — without getting stuck in someone else’s billing walled garden.

Think **Stripe-like developer experience**, but available for every country’s PSP and tax system.

## What is Moneta Kit?

Moneta Kit is open-source infrastructure for **billing and Merchant of Record (MoR)**.

It unifies:

- 💳 Payments & multi-PSP integrations
- 📊 Subscriptions & usage-based pricing
- ✅ Global tax, fraud, and compliance
- 🔑 Entitlement management & content delivery
- 🖥️ Embeddable checkout and customer portals

With one SDK + API + CLI + starter templates, developers can own your cross-border payments infra, e.g. collect payments, tax compliance and payouts in **minutes, not weeks** — without vendor lock-in.

## 🌏 Roadmap

Near-term

- [ ] Paywall SDK for content sites: RSC/SSR-first with minimal code changes (`fetchIfAllowed`, `paywall().render`).
- [ ] Metered billing for tools/AI: quotas, rate limits, overage prompts, upgrade flows.
- [ ] Default modern UI themes (Minimal, Neobrutal) with data-attributes/class hooks for customization.
- [ ] Frictionless developer onboarding: polished Next.js/React Router examples, quickstart CLI.

Mid-term

- [ ] Usage tracking & event pipeline: metering signals, quota policies, billing reconciliation.
- [ ] Pricing & plan tooling: Pricing Table, upgrade/downgrade/grace workflows.
- [ ] Extensibility plugins: LLM API routing, usage analytics, A/B testing, dynamic pricing.
- [ ] PSP baseline integrations: Stripe/PayPal first, then regional providers (PayPay, LINE Pay, Momo…).

Long-term

- [ ] PSP-agnostic payment layer: avoid vendor lock-in, abstract capability/risk switching across PSPs.
- [ ] Tax & compliance: VAT/GST/JCT modules and filing workflows.
- [ ] Globalization: localized payment experiences, regulatory compliance, regionalized billing/tax rules.

## 💡 Vision

We believe founders, startups, and businesses should focus on product, not payments. Moneta Kit will become the global abstraction layer for payments and compliance — PSP‑agnostic, tax‑aware, and programmable — so teams can ship, scale, and switch providers without fear.

## 🚀 Why Moneta?

- **Stripe is not global**: In Japan, PayPay dominates. In Thailand, LINE Pay. In Vietnam, Momo. Each country has its own PSP.
- **APIs are fragmented**: One-time payments, subscriptions, and usage-based billing all differ.
- **Tax compliance is complex**: VAT, GST, and consumption tax rules are fragmented and difficult to maintain.

**Moneta solves this by providing one unified API.**

## ✨ Features

- Zero‑friction integration: Keep your code. Add a few lines to gate content or track usage.
- No lock‑in: Swap PSPs, export data, and evolve pricing without rewrites.
- Production‑grade UX: Modern defaults (Minimal, Neobrutal) with simple theming or full control via data‑attributes.

- 🧩 **Unified Payments API** → Integrate multiple PSPs (Stripe, PayPal, LINE Pay, Momo, etc.)
- 📦 **Merchant of Record Layer** → We handle compliance and payouts for you.
- 💳 **Billing Support** → One-time, recurring subscriptions, and usage-based billing.
- 🌍 **Tax Compliance** → Integrated with Stripe Tax, Anrok, and direct modules in specific countries.
- 🛠 **Open Source SDKs** → TypeScript-first, with adapters for each PSP.
- 🖥️ Hosted checkout & customer portals (zero-setup)
- ⚛️ React components for embeddable, customizable UI

## Core Concepts

Moneta Kit allows you to:

- Manage and display checkout and customer portals with hosted UI or embeddable components.
- No-code upgrades, downgrades, and cancellation.
- Deal with cross-border payments and tax compliance in one place.
- Use Moneta Kit to build your own checkout and customer portals.

## 🏗 Example

```ts
import { useMoneta } from "@moneta-kit/core"

const { charge } = useMoneta()

// One-time payment (e.g. LINE Pay in Thailand)
await charge({
  amount: 1000,
  currency: "THB",
  method: "linepay",
  customer: { id: "cus_123" },
})
```

```ts
import { useMoneta } from "@moneta-kit/core"

const { createCustomer } = useMoneta()

// Create a customer
const customer = await createCustomer({
  name: "John Doe",
  email: "john.doe@example.com",
})


const { createSubscription } = useMoneta()

// Create a subscription
const subscription = await createSubscription({
  customerId: customer.id,
  planId: "plan_123",
})
```

### Content Paywall (Next.js, RSC)

Minimal integration with server-first gating. Two styles are supported: a one-liner helper and a manual pattern.

#### One-liner helper (recommended for DX)

```tsx
// app/page.tsx
import { prisma } from "@/lib/prisma";
import { paywall } from "@moneta-kit/react/server";
import "@moneta-kit/react/styles.css"; // optional defaults; or import a theme:
// import "@moneta-kit/react/themes/minimal.css";

export default async function Page() {
  const { render } = await paywall(() => prisma.posts.findMany());

  return (
    <section>
      <h2>Posts</h2>
      {render((posts) => (
        <ul>
          {posts.map((p) => (
            <li key={p.id}>
              <strong>{p.title}</strong>
              <div>{p.content}</div>
            </li>
          ))}
        </ul>
      ))}
    </section>
  );
}
```

#### Manual (keep explicit control, same server-first behavior)

```tsx
// app/page.tsx
import { prisma } from "@/lib/prisma";
import { moneta } from "moneta-kit"; // server facade
import { PaywallOverlay, EmptyPlaceholder, AccessBanner } from "@moneta-kit/react/client";

export default async function Page() {
  const { fetchIfAllowed, status } = moneta.authorize();
  const { allowed, data } = await fetchIfAllowed(() => prisma.posts.findMany());

  return (
    <section>
      <h2>Posts</h2>
      <AccessBanner status={status} />
      {!allowed ? (
        <PaywallOverlay href="/pricing">
          <ul>
            <li><strong>Post title example</strong><div>Post preview content…</div></li>
            <li><strong>Post title example</strong><div>Post preview content…</div></li>
          </ul>
        </PaywallOverlay>
      ) : data.length === 0 ? (
        <EmptyPlaceholder />
      ) : (
        <ul>
          {data.map((p: { id: number; title: string; content: string }) => (
            <li key={p.id}>
              <strong>{p.title}</strong>
              <div>{p.content}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
```

## Tech Stack

### Server

- [Ruby on Rails](https://rubyonrails.org/)
- [PlanetScale](https://planetscale.com/) - database(PostgreSQL)

### Client

- [React](https://react.dev/) - Embeddable components like pricing table, checkout, and customer portal.
- [Next.js](https://nextjs.org/) - Hosted checkout page & customer portal
- [React Router](https://reactrouter.com/) - Hosted checkout page & customer portal
- [Tailwind CSS](https://tailwindcss.com/) - CSS
- [Upstash](https://upstash.com/) - Redis
- [Drizzle ORM](https://orm.drizzle.team/) - Database ORM
- [Turborepo](https://turbo.build/repo) - Monorepo
- [Cloudflare Workers](https://workers.cloudflare.com/) - Serverless functions
- [Vercel](https://vercel.com/) - Deployment


## Self-hosting

Moneta Kit is open-source and self-hostable. Our goal is to make it easy to self-host and you won't be locked-in, and to make it easy to integrate with your own payment service provider.

For the self-hosted version, we will make it easy to deploy to Cloudflare Workers or Vercel.

## 📣 Get Involved

- ⭐ Star this repo
- 💬 Join the community on [Discord](https://discord.gg/2mkz2m9w6m)
- 🛠 Try the SDK, open issues, and contribute PSP adapters
