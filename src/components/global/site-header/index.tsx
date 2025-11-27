import { headers } from "next/headers";

import { AuthButtonHeader } from "@/components/global/site-header/auth-button-header";
import { LogoHeader } from "@/components/global/site-header/logo-header";
import {
  NavigationHeaderDesktop,
  NavigationHeaderMobile,
} from "@/components/global/site-header/navigation-header";
import { UserMenuHeader } from "@/components/global/site-header/user-menu-header";
import { ThemeModeToggle } from "@/components/global/theme-mode-toggle";
import { auth } from "@/lib/auth";

export const SiteHeader = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="bg-background/85 supports-backdrop-filter:bg-background/50 fixed top-0 right-0 left-0 z-50 h-16 w-full border-b backdrop-blur-sm">
      <div className="container flex h-full items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <NavigationHeaderMobile />
          <LogoHeader />
          <NavigationHeaderDesktop />
        </div>

        <div className="flex items-center gap-4">
          {session ? (
            <UserMenuHeader user={session.user} />
          ) : (
            <AuthButtonHeader />
          )}
          <ThemeModeToggle />
        </div>
      </div>
    </header>
  );
};
