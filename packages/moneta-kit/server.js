import { authorize as authorizeReact, Protected as ProtectedReact, Paywalled as PaywalledReact } from "@moneta-kit/react/server";

export const moneta = {
  authorize: authorizeReact,
};

export default PaywalledReact;
export { ProtectedReact as Protected, PaywalledReact as Paywalled, moneta };


