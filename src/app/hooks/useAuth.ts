'use client'

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useAuth(required = true) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'loading') return; // Wait for session to load
        if (!session?.user && required) {
            router.push('/login');
        }
    }, [session, status, required, router]);

    if (status === 'loading') return null; // Or return a loading state

    return session?.user;
}