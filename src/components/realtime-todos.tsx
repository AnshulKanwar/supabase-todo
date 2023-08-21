"use client";

import Todo from "@/components/todo";
import { Database } from "@/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

interface ITodo {
  id: number;
  title: string;
  is_complete: boolean;
}

export default function RealtimeTodos({
  serverTodos,
}: {
  serverTodos: ITodo[];
}) {
  const [todos, setTodos] = useState(serverTodos);

  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const channel = supabase
      .channel("realtime posts")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "todos",
        },
        (payload) => {
          setTodos([...todos, payload.new as ITodo]);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "todos",
        },
        (payload) => {
          setTodos((prevTodos) =>
            prevTodos.map((todo) =>
              todo.id === payload.old.id ? (payload.new as ITodo) : todo
            )
          );
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "todos",
        },
        (payload) => {
          setTodos((prevTodos) =>
            prevTodos.filter((todo) => todo.id !== payload.old.id)
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, todos, setTodos]);

  return (
    <div className="flex flex-col gap-3 mt-10">
      {todos!.map(({ id, title, is_complete }) => (
        <Todo key={id} id={id} title={title} isComplete={is_complete} />
      ))}
    </div>
  );
}
