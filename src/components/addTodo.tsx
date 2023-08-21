"use client";

import { FormEvent, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Input from "./ui/input";
import Button from "./ui/button";
import { Database } from "@/database.types";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClientComponentClient<Database>();

  const addTodo = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase.from("todos").insert({
      title,
      user_id: user!.id,
    });

    if (error) {
      setError(error.message);
    }

    setLoading(false);
    setTitle("");
  };

  return (
    <div>
      <form onSubmit={addTodo} className="flex gap-3">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add Todo..."
          className="grow"
        />
        <Button isSubmitButton>
          {!loading ? "Add Todo" : "Adding Todo..."}
        </Button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
