import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
    fetchOptions: {
        auth: {
           type:"Bearer",
           token: () => localStorage.getItem("bearer_token") || ""
        }
    }
});

export const { signIn, signUp, signOut } = authClient;