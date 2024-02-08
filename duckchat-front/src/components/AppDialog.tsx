import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { ReactNode } from "react";

export interface AppDialogProps {
  trigger: ReactNode;
  title: string;
  description: string;
  main: ReactNode;
  footer: ReactNode;
  maxWidth?: number;
}

function AppDialog({
  trigger,
  title,
  description,
  main,
  footer,
  maxWidth = 600,
}: AppDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={`sm:max-w-[${maxWidth}px]`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {main}
        <DialogFooter>
          {footer}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AppDialog;
