import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Textarea } from "./ui/textarea";
import { IFriendship } from "@/entities/IFriendship";
import { IMessage } from "@/entities/IMessage";
import { Button } from "./ui/button";
import { ChevronDown, Send } from "lucide-react";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  MouseEvent,
} from "react";
import { messageService } from "@/services";
import { useWebsocket } from "@/hooks/useWebsocket";
import { wsURL } from "@/utils/config";
import SkeletonCard from "./SkeletonCard";
import { toast } from "./ui/use-toast";
import { userSelector } from "@/slices/user-slice";
import { useAppSelector } from "@/hooks/useAppSelector";

import AppPopover from "./AppPopover";
import AppAlertDialog from "./AppAlertDialog";
import AppDialog from "./AppDialog";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import EditMessage from "./EditMessage";

export interface ChatProps {
  friendship: IFriendship;
}

export default function Chat({ friendship }: ChatProps) {
  const { user: userAuth } = useAppSelector(userSelector);

  const messageRef = useRef<HTMLDivElement | null>(null);
  const [message, setMessage] = useState<string>("");

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const { ws, addEventListener, removeEventListener, emit } =
    useWebsocket(wsURL);

  const [messages, setMessages] = useState<IMessage[]>([]);

  const handleCreateMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await messageService.sendMessage({
        friendshipId: friendship.id,
        content: message,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setMessage("");
    }
  };

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

  const handleNewMessage = useCallback(
    (data: {
      message: IMessage;
      type: "message_created" | "message_updated" | "message_removed";
    }) => {
      const messageStrategys = {
        message_created: (createdMessage: IMessage) => {
          setMessages((messages) => [...messages, createdMessage]);
        },
        message_updated: (updatedMessage: IMessage) => {
          setMessages(
            messages.map((message) => {
              if (message.id !== updatedMessage.id) return message;

              return updatedMessage;
            })
          );
        },
        message_removed: (removedMessage: IMessage) => {
          setMessages(
            messages.filter((message) => message.id !== removedMessage.id)
          );
        },
      };

      const strategy = messageStrategys[data.type];

      strategy(data.message);
    },
    [messages]
  );

  const handleOnChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    if (ws.current?.connected) addEventListener("newMessage", handleNewMessage);

    return () => {
      removeEventListener("newMessage", handleNewMessage);
    };
  }, [ws.current?.connected]);

  useEffect(() => {
    const getAllMessagesOfFriendship = async () => {
      try {
        setStatus("loading");

        const res = await messageService.getAllMessagesOfFriendship({
          friendshipId: friendship.id,
        });

        setMessages(res);
        setStatus("success");
      } catch (error) {
        setStatus("error");
        console.log(error);
      }
    };

    getAllMessagesOfFriendship();

    emit("enter_room", friendship.id);

    return () => {
      emit("leave_room", friendship.id);
    };
  }, [friendship]);

  useEffect(() => {
    messageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages.length]);

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex gap-3 py-5 px-4 items-center border-b-2">
        <Avatar>
          <AvatarImage
            className="w-12 rounded-full"
            src={friendship.friend.avatarURL}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <p>
            {friendship.friend.firstName} {friendship.friend.lastName}
          </p>
        </div>
      </div>

      <div className="flex-1 gap-3 p-4 overflow-auto break-all ">
        {status === "loading" && <SkeletonCard />}

        {status != "loading" &&
          messages.map((message) => (
            <div
              className={`flex  ${
                userAuth?.id === message.user.id
                  ? "justify-end "
                  : "justify-start"
              } `}
              key={message.id}
            >
              <div
                className={`relative max-w-[60%] p-3 mb-2 rounded-sm text-sm  ${
                  userAuth?.id === message.user.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <span className="0">{message.content}</span>

                {userAuth?.id === message.user.id && (
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
                            handleContinueClick={(_) =>
                              handleRemoveMessage(message)
                            }
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
          ))}
        <div ref={messageRef} />
      </div>

      <form
        className="flex items-center gap-1 p-3"
        onSubmit={handleCreateMessage}
      >
        <Textarea
          value={message || ""}
          onChange={handleOnChangeMessage}
          className="resize-none bg-input focus-visible:ring-transparent"
          placeholder={`Escreva algo para ${friendship.friend.firstName}`}
        />
        <Button size="icon" disabled={!message}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
