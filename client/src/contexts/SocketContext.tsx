import React from "react";
import { io } from "socket.io-client";
import { API_BASE_URL } from "../lib/globals";
import { useUser } from "./UserContext";

const SocketContext = React.createContext({});

export const useSocket = () => {
  const context = React.useContext(SocketContext);
  if (!context) {
    throw new Error(`useSocket must be used within a SocketContextProvider`);
  }
  return context;
};

export const SocketContextProvider = ({ children }: any) => {
  const [user] = useUser();
  const socket = io(API_BASE_URL, {
    transports: ["websocket"],
    withCredentials: true,
    autoConnect: false,
    reconnection: false,
    auth: {
      username: user?.username,
    },
  });

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
