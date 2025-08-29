# Moneta Kit

> **The open-source Merchant of Record for developers.**  
> Open-source billing — pricing, metering, and compliance made simple.  

**Moneta** is an open-source, API-first **Merchant of Record (MoR)** that unifies fragmented PSPs (Payment Service Providers) and global tax compliance.  

Think **Stripe-like developer experience**, but available for every country’s PSP and tax system.  

## What is Moneta Kit?  

Moneta Kit is open-source infrastructure for **billing and Merchant of Record (MoR)**.  

It unifies:  

- 💳 Payments & multi-PSP integrations  
- 📊 Subscriptions & usage-based pricing  
- ✅ Global tax, fraud, and compliance  
- 🔑 Entitlement management & content delivery  
- 🖥️ Embeddable checkout and customer portals  

With one SDK + API, developers can own your cross-border payments infra, e.g. collect payments, tax compliance and payouts in **minutes, not weeks** — without vendor lock-in.

## 🚀 Why Moneta?

- **Stripe is not global**: In Japan, PayPay dominates. In Thailand, LINE Pay. In Vietnam, Momo. Each country has its own PSP.  
- **APIs are fragmented**: One-time payments, subscriptions, and usage-based billing all differ.  
- **Tax compliance is complex**: VAT, GST, and consumption tax rules are fragmented and difficult to maintain.  

**Moneta solves this by providing one unified API.**

## ✨ Features

- 🧩 **Unified Payments API** → Integrate multiple PSPs (Stripe, PayPal, LINE Pay, Momo, etc.)  
- 📦 **Merchant of Record Layer** → We handle compliance and payouts for you.  
- 💳 **Billing Support** → One-time, recurring subscriptions, and usage-based billing.  
- 🌍 **Tax Compliance** → Integrated with Stripe Tax, Anrok, and direct modules in specific countries.  
- 🛠 **Open Source SDKs** → TypeScript-first, with adapters for each PSP.  
- 🖥️ Hosted checkout & customer portals (zero-setup)
- ⚛️ React components for embeddable, customizable UI

## Core Concepts

Moneta Kit allows you to:

* Manage and display checkout and customer portals with hosted UI or embeddable components.
* No-code upgrades, downgrades, and cancellation. 
* Deal with cross-border payments and tax compliance in one place.
* Use Moneta Kit to build your own checkout and customer portals.

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

## 🌏 Roadmap

- [ ] Frictionless onboarding for developers.
- [ ] Integrate with Stripe + PayPal (baseline)  
- [ ] Add LINE Pay (Thailand), Momo (Vietnam), PayPay (Japan)  
- [ ] Tax compliance modules for JP, TW, VN, TH
- [ ] Usage-based billing support.
- [ ] Plugins: LLM API routing, usage analytics, pricing optimization.

## 💡 Vision

We believe the future of payments is **cross-border + AI-driven**.  

Moneta Kit will become the **global abstraction layer** for payments + compliance, for humans and AI agents alike.  

## Self-hosting

Moneta Kit is open-source and self-hostable. Our goal is to make it easy to self-host and you won't be locked-in, and to make it easy to integrate with your own payment service provider.

For the self-hosted version, we will make it easy to deploy to Cloudflare Workers or Vercel.

## 📣 Get Involved

- ⭐ Star this repo  
- 💬 Join the community on [Discord](https://discord.gg/2mkz2m9w6m)  
- 🛠 Try the SDK, open issues, and contribute PSP adapters