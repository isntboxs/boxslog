"use client";

import { LayoutDashboardIcon, LogOutIcon, SettingsIcon } from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { GeneratedAvatar } from "@/components/global/generated-avatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { authClient } from "@/lib/auth/client";

import type { auth } from "@/lib/auth";

interface Props {
  user: typeof auth.$Infer.Session.user;
}

const AvatarUser = ({ user }: { user: typeof auth.$Infer.Session.user }) => {
  if (!user.image) {
    return (
      <GeneratedAvatar
        seed={user.name}
        style="notionistsNeutral"
        className="size-8 rounded-lg"
      />
    );
  }

  return (
    <Avatar className="size-8 rounded-lg">
      <AvatarImage src={user.image} alt={user.name} />
      <AvatarFallback className="size-8 rounded-lg uppercase">
        {user.name.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
};

export const UserMenuHeader = ({ user }: Props) => {
  const router = useRouter();

  const isMobile = useIsMobile();
  const onSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.refresh();
        },
      },
    });
  };

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon-sm">
            <AvatarUser user={user} />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="font-normal">
            <div className="flex items-center gap-2 text-left text-sm">
              <AvatarUser user={user} />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <DrawerTitle className="truncate font-semibold">
                  {user.name}
                </DrawerTitle>
                <DrawerDescription className="truncate text-xs">
                  {user.email}
                </DrawerDescription>
              </div>
            </div>
          </DrawerHeader>

          <div className="grid gap-2 px-4">
            {user.role === "ADMIN" && (
              <DrawerClose asChild>
                <Button variant="ghost" className="w-full" asChild>
                  <Link href="/admin/dashboard">
                    <LayoutDashboardIcon />
                    Dashboard
                  </Link>
                </Button>
              </DrawerClose>
            )}

            <DrawerClose asChild>
              <Button variant="ghost" className="w-full">
                <SettingsIcon />
                Settings
              </Button>
            </DrawerClose>
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="default" onClick={onSignOut} className="w-full">
                <LogOutIcon />
                Sign out
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <AvatarUser user={user} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={16}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <AvatarUser user={user} />
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="text-muted-foreground truncate text-xs">
                {user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {user.role === "ADMIN" && (
          <DropdownMenuItem asChild>
            <Link href="/admin/dashboard">
              <LayoutDashboardIcon />
              Dashboard
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <SettingsIcon />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={onSignOut}>
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
