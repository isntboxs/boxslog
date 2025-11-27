"use client";

import { MenuIcon } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LogoHeader } from "@/components/global/site-header/logo-header";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/blogs",
    label: "Blog",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/contact",
    label: "Contact",
  },
] as const;

type Props = React.ComponentProps<"nav">;

export const NavigationHeaderDesktop = ({ className, ...props }: Props) => {
  const pathName = usePathname();

  return (
    <nav className={cn("block max-md:hidden", className)} {...props}>
      <ul className="flex items-center gap-1">
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href}>
            <Button
              variant={pathName === href ? "secondary" : "ghost"}
              size="sm"
              asChild
            >
              <Link href={href}>{label}</Link>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export const NavigationHeaderMobile = ({ className, ...props }: Props) => {
  const pathName = usePathname();

  return (
    <nav
      className={cn("hidden max-md:ml-auto max-md:block", className)}
      {...props}
    >
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon-sm">
            <MenuIcon />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <LogoHeader />
              <span className="text-lg">BoxsLog</span>
            </SheetTitle>
            <SheetDescription>Navigation Menu</SheetDescription>
          </SheetHeader>

          <div className="grid gap-4 px-4">
            {NAV_LINKS.map(({ href, label }) => (
              <SheetClose key={href} asChild>
                <Button
                  variant={pathName === href ? "secondary" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href={href}>{label}</Link>
                </Button>
              </SheetClose>
            ))}
          </div>

          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </nav>
  );
};
