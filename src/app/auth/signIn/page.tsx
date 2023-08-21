"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const supabase = createClientComponentClient();

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    }

    setLoading(false)
    router.refresh();
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-10">Welcome Back</h1>
      <form onSubmit={signIn} className="flex flex-col gap-3">
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
        <Button isSubmitButton>
          {" "}
          {!loading ? "Sign In" : "Signing In..."}
        </Button>
      </form>
      <p className="text-zinc-500 mt-2">
        Don&apos;t have an account?{" "}
        <Link href="/auth/signUp" className="text-emerald-500 hover:underline">
          Create one
        </Link>
      </p>
      <div className="mt-5 text-center">
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
