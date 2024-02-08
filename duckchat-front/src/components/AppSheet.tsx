import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ReactNode } from "react";

export interface AppSheetProps {
  trigger: ReactNode;
  title: string;
  main: ReactNode;
  description: string;
  close: ReactNode;
}
function AppSheet({ trigger, title, description, main, close }: AppSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        {main}
        <SheetFooter>
          <SheetClose asChild>{close}</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default AppSheet;
