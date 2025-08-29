"use client";

import { useMonetaKit as useMonetaKitReact } from "@moneta-kit/react";
import { MonetaProvider, PaywallOverlay, UpgradeButton } from "@moneta-kit/react/client";

export const moneta = {
  useMonetaKit: useMonetaKitReact,
  Provider: MonetaProvider,
  PaywallOverlay,
  UpgradeButton,
};

export default { moneta };


