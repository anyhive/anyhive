export const authClient = createAuthClient({
    fetchOptions: {
        auth: {
           type:"Bearer",
           token: () => localStorage.getItem("bearer_token") || ""
        }
    }
});