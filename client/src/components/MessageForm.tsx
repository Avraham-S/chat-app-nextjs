import React from "react";
import { Button, FormControl, HStack, Input } from "@chakra-ui/react";

export const MessageForm = ({
  sendMessageHandler,
}: {
  sendMessageHandler: (e: any) => void;
}) => {
  return (
    <FormControl id="message">
      <form onSubmit={sendMessageHandler}>
        <HStack>
          <Input type="text" placeholder="Type your message here..." />
          <Button>Send</Button>
        </HStack>
      </form>
    </FormControl>
  );
};
