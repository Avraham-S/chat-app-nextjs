import { Button, FormControl, HStack, Input } from "@chakra-ui/react";

export const MessageForm = ({
  sendMessageHandler,
}: {
  sendMessageHandler: (e: any) => void;
}) => {
  return (
    <FormControl id="message" bg={"gray.300"} width={"100%"}>
      <form onSubmit={sendMessageHandler}>
        <HStack>
          <Input
            type="text"
            placeholder="Type your message here..."
            outline={"none"}
            border={"0"}
            _focus={{
              outline: "1px solid",
              outlineColor: "gray.400",
            }}
          />
          <Button>Send</Button>
        </HStack>
      </form>
    </FormControl>
  );
};
