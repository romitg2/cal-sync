'use client';

import { signIn } from "next-auth/react";
import useAuth from "../hooks/useAuth";

export default function Login() {
  useAuth("/dashboard", true);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-white mb-4">
          Sync All Your Google Calendars
        </h1>
        <p className="text-gray-300 mb-6">
          Connect your Google account to manage all your calendars in one place.
        </p>
        <button
          onClick={() => signIn("google", { callbackUrl: "/events" })}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg w-full transition-all"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
