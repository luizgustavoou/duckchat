import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ReactNode } from "react";

export interface AppPopoverProps {
  trigger: ReactNode;
  content: ReactNode;
  parentContentClassName?: string;
}

function AppPopover({
  trigger,
  content,
  parentContentClassName,
}: AppPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        className={`bg-popover text-popover-foreground ${parentContentClassName}`}
      >
        {content}
      </PopoverContent>
    </Popover>
  );
}

export default AppPopover;
