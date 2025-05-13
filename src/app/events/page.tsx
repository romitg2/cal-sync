'use client'

import EventCard from "../components/EventCard";
import { useCalendarEvents } from "../hooks/useCalendarEvents";
import useAuth from "../hooks/useAuth";

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

export default function Events() {

    const { data: events, isLoading, error } = useCalendarEvents();
    useAuth();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>Events</h1>
            {events?.map((event: Event) => (
                <div className="mb-4" key={event.id}>
                    <EventCard event={event} />
                </div>
            ))}
        </div>
    );
}