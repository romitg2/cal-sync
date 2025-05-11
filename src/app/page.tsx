'use client';

import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <div>
      <div>
        <button className="bg-blue-500 text-white p-2 rounded" onClick={() => signIn("google", { callbackUrl: "/events" })}>Sign in with Google</button>
      </div>
      <h1 className="text-3xl font-bold">Cal Sync</h1>
      <p>Sync your calendars</p>
    </div>
  );
}
