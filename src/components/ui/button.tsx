interface ButtonProps {
  isSubmitButton: boolean;
  children: React.ReactNode;
}

export default function Button({ isSubmitButton, children }: ButtonProps) {
  return (
    <button
      type={isSubmitButton ? "submit" : "button"}
      className="bg-white text-black p-2 rounded-md"
    >
      {children}
    </button>
  );
}
