declare module "routes-gen" {
  export type RouteParams = {
    "/": Record<string, never>;
    "/auth": Record<string, never>;
    "/auth/sign-in": Record<string, never>;
    "/auth/sign-up": Record<string, never>;
    "/create-account": Record<string, never>;
    "/protected": Record<string, never>;
  };

  export function route<
    T extends
      | ["/"]
      | ["/auth"]
      | ["/auth/sign-in"]
      | ["/auth/sign-up"]
      | ["/create-account"]
      | ["/protected"]
  >(...args: T): typeof args[0];
}
