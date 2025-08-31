import { FeatureSelector } from "@/components/feature-selector";
import { Section } from "@/components/section";
import { codeToHtml } from "shiki";

interface FeatureOption {
  id: number;
  title: string;
  description: string;
  code: string;
}

const featureOptions: FeatureOption[] = [
  {
    id: 1,
    title: "Bootstrap on the server",
    description: "Register PSP adapters and set up smart routing with fallbacks.",
    code: `import { createMoneta } from "moneta-server";
import { stripeAdapter } from "@moneta/psp-stripe";
import { payuniAdapter } from "@moneta/psp-payuni";

export const moneta = createMoneta({
  psp: {
    providers: {
      stripe: stripeAdapter({ secretKey: process.env.STRIPE_SECRET_KEY! }),
      payuni: payuniAdapter({
        merchantId: process.env.PAYUNI_MERCHANT_ID!,
        hashKey: process.env.PAYUNI_HASH_KEY!,
      }),
    },
    router: ({ tenantId, country, currency, intent }) => {
      if (currency === "TWD" && intent.type === "checkout") return "payuni";
      if (intent.type === "subscription" || intent.type === "usage") return "stripe";
      return "stripe";
    },
    fallbackOrder: ["stripe"],
  },
});`,
  },
  {
    id: 2,
    title: "Use the SDK on the frontend",
    description: "Call checkout, track usage, or check quotas via useMoneta().",
    code: `import { useMoneta } from "moneta-kit";

export function CheckoutButton() {
  const moneta = useMoneta();

  return (
    <button
      onClick={async () => {
        const { checkoutUrl } = await moneta.checkout({
          productId: "pro",
          priceId: "pro_monthly",
          customerId: "cus_123",
        });
        window.location.href = checkoutUrl;
      }}
    >
      Buy Pro
    </button>
  );
}`,
  },
  {
    id: 3,
    title: "Verify webhooks and handle events",
    description: "Receive normalized events and reconcile payments reliably.",
    code: `import express from "express";
import { moneta } from "./moneta";

const app = express();

app.post("/v1/webhooks/:psp", express.raw({ type: "application/json" }), (req, res) => {
  const event = moneta.verifyWebhook(req.params.psp, req.headers, req.body);
  switch (event.type) {
    case "payment_succeeded":
      // grant entitlements
      break;
    case "subscription_updated":
      // sync plan state
      break;
  }
  res.sendStatus(200);
});`,
  },
];

export async function Examples() {
  const features = await Promise.all(
    featureOptions.map(async (feature) => ({
      ...feature,
      code: await codeToHtml(feature.code, {
        lang: "typescript",
        theme: "github-dark",
      }),
    }))
  );

  return (
    <Section id="examples" title="How it works">
      <div className="border-x border-t">
        <FeatureSelector features={features} />
      </div>
    </Section>
  );
}
