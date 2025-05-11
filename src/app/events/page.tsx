'use server'

import { getServerSession } from "next-auth";
import { PrismaClient } from "@/generated/prisma";
import { getCalendarEvents } from "../api/events/route";
import EventCard from "../components/EventCard";

export type Event = {
    id: string;
    summary: string;
    start: {
        dateTime: string;
        timeZone: string;
    };
    end: {
        dateTime: string;
        timeZone: string;
    };
}

const prisma = new PrismaClient();

export default async function Events() {
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
            }
        });

        if (!userCalendars) {
            return (
                <div>
                    <h1>No calendars found</h1>
                </div>
            );
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


    return (
        <div>
            <h1>Events</h1>
            {calendarEvents.map((event: Event) => (
                <div className="mb-4" key={event.id}>
                    <EventCard event={event} />
                </div>
            ))}
        </div>
    );
}