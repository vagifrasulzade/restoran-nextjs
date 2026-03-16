"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as React from "react";

import { cn } from "@/lib/utils";

export const Sheet = Dialog.Root;
export const SheetTrigger = Dialog.Trigger;
export const SheetClose = Dialog.Close;

interface SheetContentProps extends React.ComponentProps<typeof Dialog.Content> {
  side?: "right" | "left";
}

export function SheetContent({ className, side = "right", children, ...props }: SheetContentProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60" />
      <Dialog.Content
        className={cn(
          "fixed z-50 h-full w-[85%] max-w-sm border-l border-white/15 bg-zinc-950 p-5 text-white shadow-2xl",
          side === "right" ? "right-0 top-0" : "left-0 top-0 border-r border-l-0",
          className
        )}
        {...props}
      >
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
}
