import { IMessage } from "@/entities/IMessage";
import { useEffect, useRef } from "react";
import { Socket, io } from "socket.io-client";

export const useWebsocket = (url: string) => {
  const ws = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(url || "ws://localhost:3000");

    ws.current = socket;

    socket.on("connect", () => console.log("Conectado ao Websocket"));
    socket.on("disconnect", () => console.log("Desconectado ao Websocket"));

    return () => {
      ws.current?.disconnect();
    };
  }, []);

  const addEventListener = async (
    event: string,
    callback: (args: any) => void
  ) => {
    ws.current?.on(event, callback);
  };

  const emit = (event: string, data: unknown) => {
    ws.current?.emit(event, data);
  };

  const connect = () => {
    ws.current?.connect();
  };

  const close = () => {
    ws.current?.close();
  };

  // useEffect(() => {
  //   const socket = io(url);

  //   ws.current = socket;

  //   return () => {
  //     console.log("Desconectando websocket!");
  //     ws.current?.disconnect();
  //   };
  // }, []);

  // const connect = () => {
  //   ws.current?.connect();
  // };

  // const close = () => {
  //   ws.current?.close();
  // };

  // console.log(1)
  // const addEventListener = async (
  //   event: string,
  //   callback: (args: any) => void
  // ) => {
  //   ws.current?.on(event, callback);
  // };

  return { ws, addEventListener, emit, close, connect };
};
