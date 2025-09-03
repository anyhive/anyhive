"use client";

import { useAnyhiveKit as useAnyhiveKitReact } from "@anyhive-kit/react";
import { AnyhiveProvider, PaywallOverlay, UpgradeButton } from "@anyhive-kit/react/client";

export const anyhive = {
  useAnyhiveKit: useAnyhiveKitReact,
  Provider: AnyhiveProvider,
  PaywallOverlay,
  UpgradeButton,
};

export default { anyhive };


