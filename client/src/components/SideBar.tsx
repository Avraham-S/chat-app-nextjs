import React, { Dispatch } from "react";
import { g_chat } from "../types/types";
import { Box, VStack } from "@chakra-ui/react";

export const SideBar = ({
  activeChat,
  setActiveChat,
  chats,
}: {
  chats: g_chat[];
  setActiveChat: Dispatch<React.SetStateAction<g_chat | null>>;
  activeChat: g_chat | null;
}) => {
  return (
    <VStack height="100%" flexGrow="1" spacing={0}>
      {chats.map((chat) => (
        <Box
          key={chat.id}
          onClick={() => setActiveChat(chat)}
          alignContent={"center"}
          bg={`${activeChat?.id === chat.id ? "blue.300" : "gray.200"}`}
          borderTop={"1px"}
          borderBottom={"1px"}
          color={"black"}
          cursor={"pointer"}
          display={"flex"}
          flexDirection={"column"}
          height={"3rem"}
          justifyContent={"center"}
          padding={2}
          width={"100%"}
          _hover={{
            bg: `${activeChat?.id === chat.id ? "blue.300" : "blue.100"}`,
            transition: "0.3s",
          }}
          _active={{ bg: "blue.200", transition: "0.3s" }}
        >
          <Box>{chat.chatName}</Box>
          {chat.messages[chat.messages.length - 1] && (
            <Box fontSize={"sm"} opacity={0.7} color={"black.200"}>
              {chat.messages[chat.messages.length - 1]?.from}:{" "}
              {chat.messages[chat.messages.length - 1]?.content}
            </Box>
          )}
        </Box>
      ))}
    </VStack>
  );
};
