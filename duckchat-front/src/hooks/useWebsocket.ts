import { useEffect, useRef } from "react";
import { Socket, io } from "socket.io-client";

export const useWebsocket = (url: string) => {
  const ws = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(url);

    ws.current = socket;

    socket.on("connect", () => console.log("Conectado ao Websocket"));
    socket.on("disconnect", () => console.log("Desconectado ao Websocket"));

    return () => {
      close();
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
    ws.current?.disconnect();
  };

  return { ws, addEventListener, emit };
};
