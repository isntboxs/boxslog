export default function AuthLaout({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:-10 flex h-svh items-center justify-center p-6">
      <div className="w-full max-w-sm md:max-w-3xl">{children}</div>
    </div>
  );
}
