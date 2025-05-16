import { OAuth2Client } from 'google-auth-library';
import { NextResponse } from 'next/server';
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// Create OAuth2 client with your credentials
const oauth2Client = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: process.env.ADD_CALENDAR_REDIRECT_URL,
});

// Exchange authorization code for tokens
async function getTokens(code: string) {
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
}

export async function GET(request: Request) {
    const url = new URL(request.url);
    const authorization_code = url.searchParams.get("code");
    const state = url.searchParams.get("state") as string;
    console.log("authorization_code", authorization_code);
    console.log("state", state);

    const userId = await prisma.state.findUnique({
        where: {
            state: state as string,
        },
        select: {
            userId: true,
        }
    });

    if (!userId) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }


    if (!authorization_code) {
        return NextResponse.json({ error: 'Authorization code not found' }, { status: 400 });
    }

    const token = await getTokens(authorization_code);
    console.log("----- token: ", token);

    
    await prisma.calendar.create({
        data: {
            token: token.access_token as string,
            userId: userId.userId,
        },
    });

    return NextResponse.redirect("http://localhost:3000/dashboard");
}
