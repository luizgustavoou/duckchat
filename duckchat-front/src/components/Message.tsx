import { IMessage } from "@/entities/IMessage";
import { useAppSelector } from "@/hooks/useAppSelector";
import { userSelector } from "@/slices/user-slice";
import AppPopover from "./AppPopover";
import { ChevronDown } from "lucide-react";
import AppAlertDialog from "./AppAlertDialog";
import EditMessage from "./EditMessage";
import { messageService } from "@/services";
import { toast } from "./ui/use-toast";
import { useState, MouseEvent } from "react";

export interface MessageProps {
  message: IMessage;
}

function Message({ message }: MessageProps) {
  const [showActions, setShowActions] = useState<boolean>(false);

  const { user: userAuth } = useAppSelector(userSelector);

  const handleRemoveMessage = async (message: IMessage) => {
    try {
      await messageService.removeMessage({ messageId: message.id });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

  const handleMouse = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    setShowActions((value) => !value);
  };

  return (
    <div
      className={`flex  ${
        userAuth?.id === message.user.id ? "justify-end " : "justify-start"
      } `}
      onMouseLeave={handleMouse}
      onMouseEnter={handleMouse}
    >
      <div
        className={`relative max-w-[60%] p-3 mb-2 rounded-sm text-sm  ${
          userAuth?.id === message.user.id
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        }`}
      >
        <span className="0">{message.content}</span>

        {userAuth?.id === message.user.id && showActions && (
          <div className="cursor-pointer absolute top-0 right-0 py-1 ">
            <AppPopover
              trigger={<ChevronDown size={20} />}
              content={
                <div className="flex flex-col ">
                  <AppAlertDialog
                    title="Remover mensagem"
                    trigger={
                      <div className="px-5 py-3 hover:bg-black/40 cursor-pointer">
                        Remover
                      </div>
                    }
                    description="Essa ação não pode ser desfeita. Isso excluirá a mensagem."
                    contentCancelButton="Cancelar"
                    contentContinueButton="Continuar"
                    handleContinueClick={(_) => handleRemoveMessage(message)}
                  />

                  <EditMessage
                    message={message}
                    trigger={
                      <div className="px-5 py-3 hover:bg-black/40 cursor-pointer">
                        Editar
                      </div>
                    }
                  />
                </div>
              }
              parentContentClassName="w-36 p-0 bg-muted rounded-none"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Message;
