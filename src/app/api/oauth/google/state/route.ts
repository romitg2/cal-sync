import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    const prisma = new PrismaClient();

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const data = await request.json();

    await prisma.state.create({
        data: {
            state: data.state,
            userId: data.session.user.userId,
        },
    });

    return NextResponse.json({ state: data.state });
}
    
