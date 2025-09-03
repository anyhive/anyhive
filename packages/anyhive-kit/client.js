"use client";

import { useAnyhiveKit as useAnyhiveKitReact } from "@anyhive/react";
import { AnyhiveProvider, PaywallOverlay, UpgradeButton } from "@anyhive/react/client";

export const anyhive = {
  useAnyhiveKit: useAnyhiveKitReact,
  Provider: AnyhiveProvider,
  PaywallOverlay,
  UpgradeButton,
};

export default { anyhive };


