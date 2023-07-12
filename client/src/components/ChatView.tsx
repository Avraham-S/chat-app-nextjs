import { Box, Fade, ScaleFade, VStack, SlideFade } from "@chakra-ui/react";
import { useUser } from "../contexts/UserContext";
import { Message } from "../types/types";
import React, { useEffect } from "react";

export const ChatView = ({ messages }: { messages: Message[] | undefined }) => {
  const [user] = useUser();

  return (
    <VStack
      justifyContent="center"
      alignItems="center"
      width={"100%"}
      flexGrow={1}
    >
      {messages?.map((msg) => {
        return (
          <Box
            display={"flex"}
            justifyContent={`flex-${
              user?.username === msg.from ? "end" : "start"
            }`}
            width={"100%"}
            key={msg.id}
            padding={4}
          >
            <SlideFade in={true}>
              <Box
                bg={`${user?.username === msg.from ? "gray.200" : "blue.200"}`}
                padding={"0.3rem"}
                borderRadius={`0.3rem 0.3rem ${
                  user?.username === msg.from ? "0 0.3rem" : "0.3rem 0"
                }`}
                textColor={"black"}
                boxShadow={"sm"}
              >
                {msg.content}
              </Box>
            </SlideFade>
          </Box>
        );
      })}
    </VStack>
  );
};
