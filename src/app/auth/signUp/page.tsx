"use client";

import { useState } from "react";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const supabase = createClientComponentClient();

  const signUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setIsError(false);
    setMessage(null);

    if (password !== confirmPassword) {
      alert("Both passwords should match");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `https://supabase-todo-sage.vercel.app/auth/callback`,
      },
    });

    if (error) {
      setIsError(true);
      setMessage(error.message);
    }

    setLoading(false);
    setMessage("An email with a link has been sent to you.");

    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-10">Create a new account</h1>
      <form onSubmit={signUp} className="flex flex-col gap-3">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button isSubmitButton>
          {!loading ? "Send link" : "Sending Link"}
        </Button>
      </form>
      <p className="text-zinc-500 mt-2">
        Already have an account?{" "}
        <Link href="/auth/signIn" className="text-emerald-500 hover:underline">
          Log in instead
        </Link>
      </p>
      <div className="mt-5 text-center">
        {message && (
          <p className={`${isError ? "text-red-500" : "text-white"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
