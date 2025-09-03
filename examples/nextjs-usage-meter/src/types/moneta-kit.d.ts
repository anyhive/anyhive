declare module "anyhive-kit" {
  export const anyhive: any;
  export function Paywalled(props: { allowed: boolean; status?: any; data?: any; locked?: any; unavailable?: any; children?: any }): any;
  const _default: (props: { allowed: boolean; status?: any; data?: any; locked?: any; unavailable?: any; children?: any }) => any;
  export default _default;
}

declare module "anyhive-kit/client" {
  export const anyhive: any;
  const _default: { anyhive: any };
  export default _default;
}


