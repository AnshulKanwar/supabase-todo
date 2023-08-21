import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { CheckSquare, Square } from "lucide-react";
import { Database } from "@/database.types";

interface TodoProps {
  id: number,
  title: string;
  isComplete: boolean;
}

export default function Todo({ id, title, isComplete }: TodoProps) {

  const supabase = createClientComponentClient<Database>()

  const completeTodo = async () => {
    const { error } = await supabase.from('todos').update({ is_complete: !isComplete }).eq('id', id)

    if (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex gap-2">
      <button onClick={completeTodo}>{!isComplete ? <Square /> : <CheckSquare />}</button>
      <span>{title}</span>
    </div>
  );
}
