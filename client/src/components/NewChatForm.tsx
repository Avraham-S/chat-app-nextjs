import {
  Accordion,
  AccordionButton,
  AccordionPanel,
  AccordionItem,
  Button,
  Input,
  Box,
  AccordionIcon,
  Text,
  Checkbox,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Contact } from "../types/types";
import { checkTargetForNewValues } from "framer-motion";
import { newChat } from "../lib/api";

export const NewChatForm = ({ contacts }: { contacts: Contact[] }) => {
  const [addedUsers, setAddedUsers] = React.useState<Contact[]>([]);
  const [chatName, setChatName] = React.useState<string>("");
  const chatInfo: { users: Contact[]; name: string } = {
    users: addedUsers,
    name: chatName,
  };

  useEffect(() => {
    console.log("addedUsers", addedUsers);
    console.log("chatInfo", chatInfo);
    // chatInfo.users = addedUsers;
    // chatInfo.name = chatName;
  }, [addedUsers, chatName]);

  return (
    <Accordion allowMultiple>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              <Box fontWeight={"bold"}>Step 1:</Box>
              <Box>Add Users</Box>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} maxHeight={"300px"} overflow={"scroll"}>
          {contacts.map((contact: Contact) => {
            return (
              <Box
                key={contact.id}
                display={"flex"}
                gap={2}
                alignItems={"center"}
              >
                <Checkbox
                  onChange={(e: any) => {
                    console.log(`${e.target}.checked`, e.target.checked);
                    e.target.checked
                      ? setAddedUsers([...addedUsers, contact])
                      : setAddedUsers(
                          addedUsers.filter(
                            (contactInState: Contact) =>
                              contactInState.id !== contact.id
                          )
                        );
                  }}
                />
                <Text>{contact.username}</Text>
              </Box>
            );
          })}
          {/* <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"flex-end"}
            mt={"1rem"}
          >
            <Button
              size={"sm"}
              onClick={() => {

                console.log(addedUsers.length === 0);
              }}
              isDisabled={addedUsers.length === 0}
            >
              Confirm Users
            </Button>
          </Box> */}
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              <Box fontWeight={"bold"}>Step 2:</Box>
              <Box>Name Chat</Box>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Input
            type="text"
            placeholder="Chat Name"
            onChange={(e: any) => {
              setChatName(e.target.value);
            }}
          />
          <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"flex-end"}
            mt={"1rem"}
          >
            {/* <Button size={"sm"}>Confirm Name</Button> */}
          </Box>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              <Box fontWeight={"bold"}>Step 3:</Box>
              <Box>Confirm Info</Box>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <VStack
            spacing={2}
            width={"100%"}
            alignItems={"flex-start"}
            border={"2px solid gray"}
            borderRadius={4}
            p={4}
          >
            <Text>
              <Text fontWeight={"bold"} as="span">
                Chat Name:
              </Text>{" "}
              {chatInfo.name}
            </Text>
            <Text>
              <Text fontWeight={"bold"} as="span">
                Users:{" "}
              </Text>
              {chatInfo.users.map((user: Contact) => user.username).join(", ")}
            </Text>
          </VStack>
          <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"flex-end"}
            mt={"1rem"}
          >
            <Button
              size={"sm"}
              isDisabled={!chatName || !addedUsers.length}
              onClick={(e) => {
                const ids = chatInfo.users.map((user: Contact) => user.id);
                newChat(chatInfo.name, ids);
              }}
            >
              Create Chat
            </Button>
          </Box>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
