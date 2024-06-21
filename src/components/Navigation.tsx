"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import handleSignOut from "./SignOut";

export default function Navigation() {
  const { data: session } = useSession();

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" href="/">What&apos;s On Sydney</a>
      </div>
      <div className="flex-none">
        {
          session && session.user ?
            <ul className="menu menu-horizontal px-1">
              <li>
                <details>
                  <summary>
                    Hi
                  </summary>
                  <ul className="p-2 bg-base-100 rounded-t-none">
                    <li><a href="/dashboard">Dashboard</a></li>
                    <li><a onClick={() => handleSignOut()}>Log out</a></li>
                  </ul>
                </details>
              </li>
              <li>
                <a href="/events/new">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M6 4V1.5h2V4h8V1.5h2V4h4v18H2V4zM4 6v3h16V6zm16 5H4v9h16z"/></svg>
                  Submit an event
                </a>
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