"use client";

import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export default function Nav() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const supabase = createClientComponentClient();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        setIsSignedIn(true)
      } else {
        setIsSignedIn(false)
      }
    });
  }, [supabase]);

  return (
    <nav className="flex justify-between py-10">
      <div>
        <Link href="/">
          <h1 className="text-3xl text-emerald-500 font-bold">Todo</h1>
        </Link>
      </div>
      <div>
        {!isSignedIn ? (
          <Link
            href="/auth/signIn"
            className="text-zinc-500 hover:text-white hover:underline"
          >
            Sign In
          </Link>
        ) : (
          <form action="/auth/signOut" method="POST">
            <button type="submit" className="text-zinc-500 hover:text-white hover:underline">Sign Out</button>
          </form>
        )}
      </div>
    </nav>
  );
}
