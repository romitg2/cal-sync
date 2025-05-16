import { PrismaClient } from "@/generated/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    const session = await getServerSession();

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userMail = session?.user.email;
    const userCalendars = await prisma.user.findUnique({
        where: {
            email: userMail,
        },
        select: {
            calendars: true,
        },
    });

    if (!userCalendars) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const calendars = userCalendars.calendars;

    return NextResponse.json(calendars);
} 