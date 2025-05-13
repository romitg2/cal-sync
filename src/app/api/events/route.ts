import { google } from 'googleapis';
import {getServerSession} from "next-auth";
import { NextResponse } from 'next/server';
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function getCalendarEvents(accessToken: string) {

  console.log("------ access token: ", accessToken);

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  const calendar = google.calendar({ version: 'v3', auth });

  try {
    const res = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    return res.data.items;
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    throw new Error('Failed to fetch calendar events');
  }
}

export async function GET() {

  const session = await getServerSession();
  const calendarEvents = [];

  if (session) {
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

    for (const calendar of userCalendars?.calendars) {
      const events = await getCalendarEvents(calendar.token);
      calendarEvents.push(...events);
    }

    calendarEvents.sort((a, b) => {
      const dateA = new Date(a.start.dateTime || a.start.date);
      const dateB = new Date(b.start.dateTime || b.start.date);
      return dateA.getTime() - dateB.getTime();
    });
  }

  return NextResponse.json(calendarEvents);
}