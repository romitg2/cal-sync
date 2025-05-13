'use client';

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";


export default function NavBar() {
    const { data: session } = useSession();
    return (
        <nav>
            <div className="flex justify-end mt-4 px-12 items-center gap-2">
                {session ? (<button className="bg-red-500 text-white p-2 rounded" onClick={() => signOut()}>Sign Out</button>) : null}
            </div>
        </nav>
    );
}