import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/database.types";
import AddTodo from "@/components/addTodo";
import RealtimeTodos from "@/components/realtime-todos";

export default async function Home() {
  const supabase = await createServerComponentClient<Database>({ cookies });

  const { data: todos } = await supabase.from("todos").select();

  return (
    <main className="max-w-lg mx-auto mt-20">
      <AddTodo />
      <RealtimeTodos serverTodos={todos ?? []} />
    </main>
  );
}
