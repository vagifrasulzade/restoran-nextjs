"use client";

import {
  Content,
  Item,
  Portal,
  Root,
  Trigger,
} from "@radix-ui/react-dropdown-menu";
import * as React from "react";

import { cn } from "@/lib/utils";

export const DropdownMenu = Root;
export const DropdownMenuTrigger = Trigger;

type DropdownMenuContentProps = React.ComponentProps<typeof Content>;

export function DropdownMenuContent({ className, sideOffset = 8, ...props }: DropdownMenuContentProps) {
  return (
    <Portal>
      <Content
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-44 rounded-md border border-white/15 bg-zinc-950 p-1 text-white shadow-xl",
          className
        )}
        {...props}
      />
    </Portal>
  );
}

type DropdownMenuItemProps = React.ComponentProps<typeof Item>;

export function DropdownMenuItem({ className, ...props }: DropdownMenuItemProps) {
  return (
    <Item
      className={cn(
        "flex cursor-pointer select-none items-center justify-between rounded-sm px-3 py-2 text-sm outline-none transition-colors focus:bg-zinc-800 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    />
  );
}
