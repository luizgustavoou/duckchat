import { ReactNode } from "react";
import { Button } from "./ui/button";

export interface AppButton {
  variant?:
    | "default"
    | "destructive"
    | "ghost"
    | "link"
    | "outline"
    | "secondary";
  size?: "default" | "icon" | "lg" | "sm";
  className?: string;
  content: ReactNode;
}
function AppButton({ variant, size, className, content }: AppButton) {
  return (
    <Button variant={variant} size={size} className={className}>
      {content}
    </Button>
  );
}

export default AppButton;
