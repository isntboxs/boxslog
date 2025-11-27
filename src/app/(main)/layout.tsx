import { SiteHeader } from "@/components/global/site-header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh flex-col pt-16">
      <SiteHeader />
      {children}
    </div>
  );
}
