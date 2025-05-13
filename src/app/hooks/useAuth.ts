'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useAuth(redirectUrl: string, redirectIfLoggedIn: boolean = false) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'loading') return; // Wait for session to load
        if (!session?.user && !redirectIfLoggedIn) {
            router.push(redirectUrl);
        }
        if (session?.user && redirectIfLoggedIn) {
            router.push(redirectUrl);
        }
    }, [session, status, redirectUrl, router, redirectIfLoggedIn]);

    if (status === 'loading') return null; // Or return a loading state

    return session?.user;
}