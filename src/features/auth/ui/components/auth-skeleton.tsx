import { Skeleton } from "@/components/ui/skeleton";

export const SignInFormSekeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      {Array.from({ length: 2 }).map((_, index) => (
        <Skeleton key={index} className="h-9 w-full" />
      ))}

      <Skeleton className="h-9 w-full" />
    </div>
  );
};

export const SignUpFormSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="h-9 w-full" />
      ))}

      <Skeleton className="h-9 w-full" />
    </div>
  );
};

export const HasAccountLinkSkeleton = () => {
  return (
    <div className="mt-7 flex items-center justify-center gap-2">
      <Skeleton className="h-4 w-36" />
      <Skeleton className="h-4 w-12" />
    </div>
  );
};
