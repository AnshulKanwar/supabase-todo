import { CheckSquare, Square } from "lucide-react";

interface TodoProps {
  title: string;
  isComplete: boolean;
}

export default function Todo({ title, isComplete }: TodoProps) {
  return (
    <div className="flex gap-2">
      {!isComplete ? <Square /> : <CheckSquare />}
      <span>{title}</span>
    </div>
  );
}
