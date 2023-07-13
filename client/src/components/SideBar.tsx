import React, { Dispatch } from "react";
import { g_chat } from "../types/types";
import {
  Box,
  Tab,
  TabList,
  TabPanels,
  VStack,
  TabPanel,
  Tabs,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { SearchUsersForm } from "./SearchUsersForm";
import { UserListItem } from "./UserListItem";
import { useUser } from "../contexts/UserContext";
import { getContacts } from "../lib/api";
import { EditIcon } from "@chakra-ui/icons";
import { on } from "events";
import { NewChatForm } from "./NewChatForm";

export const SideBar = ({
  activeChat,
  setActiveChat,
  chats,
}: {
  chats: g_chat[];
  setActiveChat: Dispatch<React.SetStateAction<g_chat | null>>;
  activeChat: g_chat | null;
}) => {
  const [contacts, setContacts] = React.useState<
    { id: string; username: string }[]
  >([]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const focusRef = React.useRef<any>(null);

  const [user, _, updateUser] = useUser();

  React.useEffect(() => {
    if (user) {
      getContacts(setContacts);
    }
  }, [user?.contactsIds]);

  React.useEffect(() => {
    console.log("contacts", contacts);
  }, [contacts]);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={focusRef}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>New Chat</ModalHeader>
          <ModalBody>
            <NewChatForm contacts={contacts} />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      <Tabs>
        <TabList>
          <Tab>Chats</Tab>
          <Tab>Contacts</Tab>
          <Tab>Find Users</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <VStack height="100%" flexGrow="1" spacing={0}>
              <Box
                width={"100%"}
                display={"flex"}
                justifyContent={"space-between"}
                cursor={"pointer"}
                _hover={{ bg: "gray.100" }}
                padding={2}
                transition={"0.3s"}
                borderRadius={4}
                onClick={onOpen}
              >
                <Text>New Chat</Text> <EditIcon />
              </Box>
              {chats.length ? (
                chats.map((chat) => (
                  <Box
                    key={chat.id}
                    onClick={() => setActiveChat(chat)}
                    alignContent={"center"}
                    bg={`${
                      activeChat?.id === chat.id ? "blue.300" : "gray.200"
                    }`}
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
                      bg: `${
                        activeChat?.id === chat.id ? "blue.300" : "blue.100"
                      }`,
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
                ))
              ) : (
                <Box>No chats</Box>
              )}
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack height="100%" flexGrow="1" spacing={0}>
              {contacts.length ? (
                contacts.map((contact) => (
                  <UserListItem
                    updateUser={updateUser}
                    result={contact}
                    user={user}
                    key={contact.id}
                  />
                ))
              ) : (
                <Box>
                  <Box>No contacts</Box>
                </Box>
              )}
            </VStack>
          </TabPanel>
          <TabPanel>
            <SearchUsersForm focusRef={focusRef} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
