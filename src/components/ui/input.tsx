interface InputProps {
  type: "text" | "email" | "password"
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function Input({
  type,
  value,
  onChange,
  className,
  ...rest
}: InputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e)}
      className={`p-2 bg-zinc-700 rounded-md ${className}`}
      {...rest}
    />
  );
}
