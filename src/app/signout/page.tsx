'use client'

import { signOut } from "next-auth/react";
import { useEffect } from "react"

export default async function SignoutPage() {
    useEffect(() => {
        setTimeout(() => {
            signOut({ callbackUrl: window.location.origin });
        }, 500);
    }, []);

    return (
        <>
            <div>
                Loading...
            </div>
        </>
    )
}