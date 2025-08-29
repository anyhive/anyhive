declare module "moneta-kit" {
  export const moneta: any;
  export function Paywalled(props: { allowed: boolean; status?: any; data?: any; locked?: any; unavailable?: any; children?: any }): any;
  const _default: (props: { allowed: boolean; status?: any; data?: any; locked?: any; unavailable?: any; children?: any }) => any;
  export default _default;
}

declare module "moneta-kit/client" {
  export const moneta: any;
  const _default: { moneta: any };
  export default _default;
}


