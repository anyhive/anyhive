import { betterAuth } from "better-auth";
import { bearer } from "better-auth/plugins";
 
export const auth: ReturnType<typeof betterAuth> = betterAuth({
    plugins: [
        bearer()
    ]
});