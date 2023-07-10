import React from "react";
import { useSocket } from "../contexts/SocketContext";
import { ChatWindow } from "../components/ChatWindow";
import { SideBar } from "../components/SideBar";
import { HStack, VStack, Spinner, Box } from "@chakra-ui/react";
import { useUser } from "../contexts/UserContext";

export const HomePage = () => {
  const socket: any = useSocket();
  const [isConnected, setIsConnected] = React.useState<boolean>(
    socket.connected
  );
  const [user] = useUser();

  React.useEffect(() => {
    // console.log(socket.connected);
    socket.on("connect", () => {
      setIsConnected(socket.connected);
    });
    socket.on("disconnect", () => {
      socket.connect();
      setIsConnected(socket.connected);
    });
    if (!socket.connected) {
      socket.connect();
      // console.log("in if", socket.connected);
    }
  }, [socket.connected]);

  return (
    <VStack
      style={{
        height: "100vh",
      }}
    >
      <h1>Home Page</h1>
      <h2>{user?.username}</h2>
      <Box style={{ height: "100%", display: "flex", width: "50%" }}>
        {/* <SideBar /> */}
        {!isConnected ? (
          <Spinner hidden={socket.connected} title="connecting" />
        ) : (
          <ChatWindow socket={socket} />
        )}
      </Box>
    </VStack>
  );
};
