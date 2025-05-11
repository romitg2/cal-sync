import type { Event } from "../events/page";
import dayjs from "dayjs";

export default function EventCard({ event }: { event: Event }) {

    const startDate = dayjs(event.start?.dateTime);
    const endDate = dayjs(event.end?.dateTime);

    return (
        <div className="border border-gray-300 dark:border-gray-600 p-4 rounded bg-white dark:bg-gray-800 text-black dark:text-white shadow-sm">
            <h2 className="font-bold text-lg mb-2">{event.summary}</h2>
            <p className="text-sm mb-1">{startDate.format("DD-MM-YYYY hh:mm A")}</p>
            <p className="text-sm">{endDate.format("DD-MM-YYYY hh:mm A")}</p>
        </div>
    );
}