"use client";

import { motion } from "motion/react";

import Link from "next/link";

import { BoxsIcon } from "@/components/global/boxs-icon";

const MotionLink = motion.create(Link);

export const LogoHeader = () => {
  return (
    <MotionLink href="/" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
      <BoxsIcon className="size-7" />
      <span className="sr-only">Go to homepage</span>
    </MotionLink>
  );
};
