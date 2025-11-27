"use client";

import { AlertCircleIcon, RefreshCcwIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { cn } from "@/lib/utils";

const fadeInOut = {
  initial: { opacity: 0, translateY: -10 },
  animate: { opacity: 1, translateY: 0 },
  exit: { opacity: 0, translateY: -10 },
};

interface Props {
  title: string;
  description: string;
  className?: string;
}

export const ErrorState = ({ description, title, className }: Props) => {
  const router = useRouter();

  const onRefresh = () => {
    router.refresh();
  };

  return (
    <AnimatePresence>
      <motion.div
        {...fadeInOut}
        className={cn(
          "fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center border",
          className
        )}
      >
        <Empty className="w-full">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <AlertCircleIcon className="text-destructive" />
            </EmptyMedia>
            <EmptyTitle>{title}</EmptyTitle>
            <EmptyDescription>{description}</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="default" size="sm" onClick={onRefresh}>
              <RefreshCcwIcon />
              <span>Try again</span>
            </Button>
          </EmptyContent>
        </Empty>
      </motion.div>
    </AnimatePresence>
  );
};
