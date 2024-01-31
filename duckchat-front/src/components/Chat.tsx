import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Textarea } from "./ui/textarea";
import { IFriendship } from "@/entities/IFriendship";
import { IMessage } from "@/entities/IMessage";
import { Button } from "./ui/button";
import { ChevronRightIcon } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { messageService } from "@/services";
import { Socket, io } from "socket.io-client";
import { useWebsocket } from "@/hooks/useWebsocket";
import { useAppNavigate } from "@/hooks/useNavigate";

export interface ChatProps {
  friendship: IFriendship;
}

export default function Chat({ friendship }: ChatProps) {
  const connection = useRef<Socket | null>(null);
  const navigate = useAppNavigate();

  const [messages, setMessages] = useState<IMessage[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Handle send message!");
  };

  useEffect(() => {
    const socket = io("ws://localhost:3000");

    socket.on("newMessage", (data: IMessage) => {
      console.log(data);
    });

    connection.current = socket;

    return () => {
      console.log("Desconectando websocket!");
      connection.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    const getAllMessagesOfFriendship = async () => {
      const res = await messageService.getAllMessagesOfFriendship({
        friendshipId: friendship.id,
      });

      setMessages(res);
    };

    getAllMessagesOfFriendship();

    connection.current?.emit("enter_room", friendship.id);

    return () => {
      connection.current?.emit("leave_room", friendship.id);
    };
  }, [friendship]);

  const handleLogout = () => {
    navigate("/signin");
  };
  return (
    <div className="flex-1 flex flex-col gap-2">
      <Button onClick={handleLogout}>Sair</Button>
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

      <div className="flex-1">
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
      </div>

      <div>
        <form className="flex items-center gap-1" onSubmit={handleSubmit}>
          <Textarea
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
