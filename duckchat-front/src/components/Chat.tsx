import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Textarea } from "./ui/textarea";
import { IFriendship } from "@/entities/IFriendship";
import { IMessage } from "@/entities/IMessage";
import { Button } from "./ui/button";
import { ChevronRightIcon } from "lucide-react";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { messageService } from "@/services";
import { useWebsocket } from "@/hooks/useWebsocket";
import { wsURL } from "@/utils/config";
import { Separator } from "@radix-ui/react-separator";
import SkeletonCard from "./SkeletonCard";

export interface ChatProps {
  friendship: IFriendship;
}

export default function Chat({ friendship }: ChatProps) {
  const [message, setMessage] = useState<string>("");

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const { ws, addEventListener, removeEventListener, emit } =
    useWebsocket(wsURL);

  const [messages, setMessages] = useState<IMessage[]>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      messageService.sendMessage({
        friendshipId: friendship.id,
        content: message,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setMessage("");
    }
  };

  const handleNewMessage = useCallback((data: IMessage) => {
    setMessages((messages) => [...messages, data]);
  }, []);

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

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex gap-2 items-center border-b-2 pb-2">
        <Avatar>
          <AvatarImage
            className="w-12 rounded-full"
            src={friendship.friend.avatarURL}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p>{`${friendship.friend.firstName} ${friendship.friend.lastName}`}</p>
      </div>

      <div className="flex-1 overflow-auto">
        {status === "loading" ? (
          <SkeletonCard />
        ) : (
          <>
            {messages.map((message) => (
              <div
                className="flex py-3 px-4 items-center gap-2 hover:bg-accent/50 cursor-pointer"
                key={message.id}
              >
                <Avatar>
                  <AvatarImage
                    className="w-12 rounded-full"
                    src={message.user.avatarURL}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <span className="mr-1">{message.user.firstName}</span>
                  <span className="text-sm text-muted-foreground">
                    {message.createdAt}
                  </span>

                  <p>{message.content}</p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <div>
        <form className="flex items-center gap-1" onSubmit={handleSubmit}>
          <Textarea
            value={message || ""}
            onChange={handleOnChangeMessage}
            className="resize-none bg-input focus-visible:ring-transparent"
            placeholder={`Conversar com ${friendship.friend.firstName}`}
          />
          <Button size="icon">
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
