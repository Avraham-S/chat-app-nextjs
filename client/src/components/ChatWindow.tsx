import {
  Button,
  FormControl,
  VStack,
  Input,
  HStack,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { Message } from "../types/types";
import { useUser } from "../contexts/UserContext";
import { ChatView } from "./ChatView";
import { MessageForm } from "./MessageForm";

export const ChatWindow = ({ socket }: any) => {
  const [messages, setMessages] = React.useState<any>([]);
  const [target, setTarget] = React.useState<any>("user2");
  const [user] = useUser();

  React.useEffect(() => {
    socket.on("private-message", (message: any) => {
      console.log("private-message", message);
      setMessages((messages: any) => [...messages, message]);
    });
  }, []);

  const sendMessageHandler = (e: any): void => {
    e.preventDefault();
    const input = e.target[0];
    const messageContent = input.value;
    input.value = "";
    const message: Message = {
      id: crypto.randomUUID(),
      from: user?.username,
      to: target,
      content: messageContent,
      dateTime: Date.now(),
    };
    socket.emit("private-message", message);
    setMessages((messages: any) => [...messages, message]);
  };

  return (
    <Box style={{ flexGrow: "10", alignSelf: "stretch", width: "50%" }}>
      <VStack spacing={4}>
        <ChatView messages={messages} />
        <MessageForm sendMessageHandler={sendMessageHandler} />
      </VStack>
    </Box>
  );
};
