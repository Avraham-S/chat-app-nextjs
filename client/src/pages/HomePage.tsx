import React from "react";
import { useSocket } from "../contexts/SocketContext";
import { HStack, VStack } from "@chakra-ui/react";

export const HomePage = () => {
  const socket: any = useSocket();

  React.useEffect(() => {
    socket.connect({});
  }, []);

  return (
    <VStack>
      <h1>Home Page</h1>
      <HStack>
        {/* <SideBar */}
        {/* <ChatWindow */}
      </HStack>
    </VStack>
  );
};
