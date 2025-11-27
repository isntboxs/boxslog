import { AnimatePresence, motion } from "motion/react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
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

export const LoadingState = ({ description, title, className }: Props) => {
  return (
    <AnimatePresence>
      <motion.div
        {...fadeInOut}
        className={cn(
          "fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center border",
          className
        )}
      >
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Spinner />
            </EmptyMedia>
            <EmptyTitle>{title}</EmptyTitle>
            <EmptyDescription>{description}</EmptyDescription>
          </EmptyHeader>
        </Empty>
      </motion.div>
    </AnimatePresence>
  );
};
