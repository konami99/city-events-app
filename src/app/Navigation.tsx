"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Navigation() {
  const { data: session } = useSession();

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start"></div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl" href="/">What&apos;s On</a>
      </div>
      <div className="navbar-end">
        {
          session && session.user ?
            <ul className="menu menu-horizontal px-1">
              <li>
                <details>
                  <summary>Hi { session.user.email }</summary>
                  <ul className="p-2">
                    <li><a href="/dashboard">Dashboard</a></li>
                    <li><a onClick={() => signOut()}>Log out</a></li>
                  </ul>
                </details>
              </li>
            </ul>
          :
            <ul className="menu menu-horizontal px-1">
              <li><a onClick={() => signIn()}>Log in</a></li>
              <li><a onClick={() => signIn()}>List your event for free</a></li>
            </ul>
        }
      </div>
    </div>
  )
}