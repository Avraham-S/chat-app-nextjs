import React from "react";
import { useSocket } from "../contexts/SocketContext";
import { ChatWindow } from "../components/ChatWindow";
import { SideBar } from "../components/SideBar";
import { HStack, VStack, Spinner } from "@chakra-ui/react";

export const HomePage = () => {
  const socket: any = useSocket();
  const [isConnected, setIsConneted] = React.useState<boolean>(false);

  React.useEffect(() => {
    socket.connect({});
    socket.on("connect", () => {
      setIsConneted(true);
    });
    socket.on("disconnect", () => {
      setIsConneted(false);
    });
  }, [socket.connected]);

  return (
    <VStack
      style={{
        height: "100vh",
      }}
    >
      <h1>Home Page</h1>
      <Spinner hidden={isConnected} title="connecting" />
      <div style={{ height: "100%", display: "flex" }}>
        <SideBar />
        <ChatWindow socket={socket} />
      </div>
    </VStack>
  );
};
