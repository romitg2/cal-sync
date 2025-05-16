'use client';

import { useCalendars } from "../hooks/useCalendars"
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";

export default function Dashboard() {

    const { calendars, isLoading, error } = useCalendars();
    const { data: session } = useSession();
    console.log("session", session);


    const onclick = async () => {
        // trigger oauth flow, and after finishing oauth flow redirect to this page and invalidate query

        const data = await fetch("http://localhost:3000/api/oauth/google/url");
        const state = uuidv4();

        await fetch("http://localhost:3000/api/oauth/google/state", {
            method: "POST",
            body: JSON.stringify({ state, session }),
        });

        const concentScreeUrl = await data.json();
        console.log("concent Screen Url: ", concentScreeUrl);

        redirect(concentScreeUrl + "&state=" + state);
    }


return (
    <div>
        <div className="flex justify-end mt-4 px-12 items-center gap-2">
            <button className="bg-blue-500 text-white p-2 rounded" onClick={() => onclick()}>Add Calendar</button>
        </div>
        {isLoading ? <p>Loading...</p> : null}
        {error ? <p>Error: {error.message}</p> : null}
        {calendars?.map((calendar: any) => (
            <div key={calendar.id}>
                <p>{calendar.name}</p>
            </div>
        ))}
        <h1>Dashboard</h1>
    </div>
);
}