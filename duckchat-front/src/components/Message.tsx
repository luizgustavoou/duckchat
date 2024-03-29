import { IMessage } from "@/entities/IMessage";
import { useAppSelector } from "@/hooks/useAppSelector";
import { authSelector } from "@/slices/auth-slice";
import AppPopover from "./AppPopover";
import { ChevronDown } from "lucide-react";
import AppAlertDialog from "./AppAlertDialog";
import EditMessage from "./EditMessage";
import { messageService } from "@/services";
import { useState, MouseEvent } from "react";
import { useToast } from "./ui/use-toast";
import { HttpError } from "@/exceptions/http-error";

export interface MessageProps {
  message: IMessage;
}

function Message({ message }: MessageProps) {
  const { toast } = useToast();
  const [showActions, setShowActions] = useState<boolean>(false);

  const { user: authUser } = useAppSelector(authSelector);

  const handleRemoveMessage = async (message: IMessage) => {
    try {
      await messageService.removeMessage({ messageId: message.id });
    } catch (error) {
      let errorMessage = "Ocorreu algum erro. Por favor, tente mais tarde.";

      if (error instanceof HttpError) errorMessage = error.message;

      toast({
        variant: "destructive",
        title: "Erro ao deletar mensagem.",
        description: errorMessage,
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
        authUser?.id === message.user.id ? "justify-end " : "justify-start"
      } `}
      onMouseLeave={handleMouse}
      onMouseEnter={handleMouse}
    >
      <div
        className={`relative max-w-[60%] p-3 mb-2 rounded-sm text-sm  ${
          authUser?.id === message.user.id
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        }`}
      >
        <span className="0">{message.content}</span>

        {authUser?.id === message.user.id && showActions && (
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
              parentContentClassName="w-36 p-0 rounded-none"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Message;
