import { google } from 'googleapis';
import {getServerSession} from "next-auth";
import { NextResponse } from 'next/server';

export async function getCalendarEvents(accessToken: string) {
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

    console.log("session: ", session);

    const accessToken = session?.user.accessToken;
    if (!accessToken) {
        return new Response('Unauthorized', { status: 401 });
    }
    
    try {
        const events = await getCalendarEvents(accessToken);
        return NextResponse.json(events);
    } catch (error) {
        console.error('Error fetching calendar events:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}
