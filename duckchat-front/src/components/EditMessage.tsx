import { IMessage } from "@/entities/IMessage";
import AppDialog from "./AppDialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChangeEvent, ReactNode, useEffect, useState, MouseEvent } from "react";
import { messageService } from "@/services";

export interface EditMessageProps {
  trigger: ReactNode;
  message: IMessage;
}

function EditMessage({ message, trigger }: EditMessageProps) {
  const [messageEdit, setMessageEdit] = useState<string | null>(null);

  useEffect(() => {
    setMessageEdit(message.content);
  }, [message]);

  const handleEditMessage = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    if (messageEdit === null) return;

    await messageService.updateMessage({
      messageId: message.id,
      content: messageEdit,
    });
  };

  const handleOnChangeEditMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageEdit(e.target.value);
  };

  return (
    <AppDialog
      trigger={trigger}
      title={`Editar mensagem ${message.content}`}
      description="Faça alterações na mensagem aqui. Clique em salvar quando terminar."
      main={
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="messageContent" className="text-right">
              Mensagem
            </Label>
            <Input
              id="messageContent"
              value={messageEdit || ""}
              onChange={handleOnChangeEditMessage}
              className="col-span-3"
            />
          </div>
        </div>
      }
      footer={
        <Button type="submit" onClick={handleEditMessage}>
          Salvar mudanças
        </Button>
      }
    />
  );
}

export default EditMessage;
