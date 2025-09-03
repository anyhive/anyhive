import { authorize as authorizeReact, Protected as ProtectedReact, Paywalled as PaywalledReact } from "@anyhive-kit/react/server";

export const anyhive = {
  authorize: authorizeReact,
};

export default PaywalledReact;
export { ProtectedReact as Protected, PaywalledReact as Paywalled, anyhive };


