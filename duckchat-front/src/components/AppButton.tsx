import { ReactNode, MouseEvent } from "react";
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
  handleOnClick?: (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
  disabled?: boolean;
}

function AppButton({
  variant,
  size,
  className,
  content,
  handleOnClick,
  disabled,
}: AppButton) {
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleOnClick}
      disabled={disabled}
    >
      {content}
    </Button>
  );
}

export default AppButton;
