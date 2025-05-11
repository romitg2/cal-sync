import { getCalendarEvents } from "../../events/route";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
    interface Session {
        user: {
            accessToken?: string;
        };
    }
}

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            authorization: {
                params: {
                    access_type: "offline",
                    prompt: "consent",  
                    response_type: "code",
                    scope: "openid email profile https://www.googleapis.com/auth/calendar"
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, account}) {
            if(account) {
                token.accessToken = account.access_token;
            }

            console.log("access token", token.accessToken);

            const calendarEvents = await getCalendarEvents(token.accessToken as string);
            console.log("calendarEvents", calendarEvents);

            return token;
        },
        async session({ session, token }) {
            session.user.accessToken = token.accessToken as string;
            return session;
        }
    }
})

export { handler as GET, handler as POST }