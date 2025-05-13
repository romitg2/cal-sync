'use client';

import useAuth from "./hooks/useAuth";

export default function Home() {
  useAuth("/login");
  useAuth("/events", true);

  return (
    <div>
      <h1 className="text-3xl font-bold">Cal Sync</h1>
      <p>Sync your calendars</p>
    </div>
  );
}
