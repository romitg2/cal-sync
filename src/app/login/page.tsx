'use client';

import { signIn } from "next-auth/react";
import useAuth from "../hooks/useAuth";

export default function Login() {
    useAuth("/dashboard", true);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex justify-center items-center h-screen">
                <button className="bg-blue-500 text-white p-2 rounded" onClick={() => signIn("google", { callbackUrl: "/events" })}>Sign in with Google</button>
            </div>
        </div>
    );
}