import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

export const useWebsocket = (url: string) => {
  const [status, setStatus] = useState<
    "OPEN" | "CONNECTING" | "CLOSED" | "CONNECTING_ERROR"
  >();

  const [socket, setSocket] = useState<Socket | null>(io(url));

  socket?.on("connect", () => {
    setStatus("OPEN");
    console.log("Sucesseful connection WS");
  });

  // setStatus("CONNECTING");

  socket?.on("disconnect", (reason) => {});

  socket?.on("error", (error) => {
    console.error("erro:", { error });
  });

  socket?.on("connect_error", (error) => {
    setStatus("CONNECTING_ERROR");

    console.log("CONNECT_ERROR");
    console.error(error);
    // setTimeout(() => {
    //     socket.connect();
    // }, 1000);
  });

  socket?.on("unauthorized_connection", () => {});

  const connect = () => {
    socket?.connect();
  };

  const close = () => {
    socket?.close();
  };

  const addEventListener = async (
    event: string,
    callback: (args: any) => void
  ) => {
    socket?.on(event, callback);
  };

  // useEffect(() => {
  //   const newSocket = io(url);
  //   setSocket(newSocket);

  //   return () => {
  //     console.log("Websocket disconectado");
  //     socket && socket.disconnect();
  //   };
  // }, [url]);

  return { socket, status, connect, close, addEventListener };
};
