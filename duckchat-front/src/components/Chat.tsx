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

import Message from "./Message";

export interface ChatProps {
  friendship: IFriendship;
}

export default function Chat({ friendship }: ChatProps) {
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

  const handleNewMessage = (data: {
    message: IMessage;
    type: "message_created" | "message_updated" | "message_removed";
  }) => {
    console.log("[LOG handleNewMessage");
    console.log({ data });

    const messageStrategys = {
      message_created: (createdMessage: IMessage) => {
        setMessages((messages) => [...messages, createdMessage]);
      },
      message_updated: (updatedMessage: IMessage) => {
        setMessages((messages) =>
          messages.map((message) =>
            message.id !== updatedMessage.id ? message : updatedMessage
          )
        );
      },
      message_removed: (removedMessage: IMessage) => {
        setMessages((messages) =>
          messages.filter((message) => message.id !== removedMessage.id)
        );
      },
    };

    const strategy = messageStrategys[data.type];

    strategy(data.message);
  };

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
            <Message message={message} key={message.id} />
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
