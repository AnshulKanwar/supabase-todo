export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mt-32">{children}</div>;
}