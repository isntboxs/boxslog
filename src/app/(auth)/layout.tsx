export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh px-4 py-16 md:py-32">
      <div className="m-auto h-full w-full max-w-sm md:max-w-3xl">
        {children}
      </div>
    </div>
  );
}
