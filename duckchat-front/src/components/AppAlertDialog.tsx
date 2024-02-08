import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ReactNode, MouseEvent } from "react";

export interface AppAlertDialogProps {
  trigger: ReactNode;
  title: string;
  description: string;
  contentCancelButton: string;
  contentContinueButton: string;
  handleContinueClick: (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
}

function AppAlertDialog({
  trigger,
  title,
  description,
  contentCancelButton,
  contentContinueButton,
  handleContinueClick,
}: AppAlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{contentCancelButton}</AlertDialogCancel>
          <AlertDialogAction onClick={handleContinueClick}>
            {contentContinueButton}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AppAlertDialog;
