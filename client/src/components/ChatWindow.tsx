import {
  Button,
  FormControl,
  VStack,
  Input,
  HStack,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { Message, g_chat } from "../types/types";
import { useUser } from "../contexts/UserContext";
import { ChatView } from "./ChatView";
import { MessageForm } from "./MessageForm";
import { Socket } from "socket.io-client";

export const ChatWindow = ({
  socket,
  activeChat,
  chats,
}: {
  socket: Socket;
  activeChat: g_chat | null;
  chats: g_chat[];
}) => {
  const [messages, setMessages] = React.useState<Message[] | undefined>(
    activeChat?.messages
  );
  const [target, setTarget] = React.useState<any>(activeChat?.chatName);
  const [user] = useUser();

  React.useEffect(() => {
    socket.on("private-message", (message: any) => {
      console.log("private-message", message);
      console.log("activeChat", activeChat);
      const chatIndex = chats.findIndex(
        (chat) => chat.chatName === message.from
      );
      chats[chatIndex].messages = chats[chatIndex].messages.concat(message);
      console.log(chats[chatIndex].id === activeChat?.id);
      if (chats[chatIndex].id === activeChat?.id)
        setMessages(activeChat.messages);
    });
  }, []);

  React.useEffect(() => {
    // console.log("setting messages: active");
    setMessages(activeChat?.messages);
  }, [activeChat]);

  //   React.useEffect(() => {
  //     // console.log("setting messages: messages");
  //     setMessages(activeChat.messages);
  //   }, [activeChat.messages]);
  //   React.useEffect(() => {
  //     activeChat.messages = messages;
  //   }, [messages]);

  React.useEffect(() => {
    if (activeChat) setTarget(activeChat.chatName);
  }, [activeChat]);

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
    setMessages((messages: any) => {
      if (activeChat?.messages)
        activeChat.messages = activeChat?.messages.concat(message);
      return activeChat?.messages;
    });
  };

  return (
    <Box
      flexGrow="10"
      width="100%"
      height="100%"
      bg="gray.300"
      position={"relative"}
    >
      <VStack spacing={4}>
        <Box width={"100%"}>
          <ChatView messages={messages} />
        </Box>
        <Box width={"100%"} position={"absolute"} bottom={0}>
          <MessageForm sendMessageHandler={sendMessageHandler} />
        </Box>
      </VStack>
    </Box>
  );
};
