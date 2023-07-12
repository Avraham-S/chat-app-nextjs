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
      {/* <Button onClick={onOpen} width={"100%"}>
        Find People
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={focusRef}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Search Users</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SearchUsersForm focusRef={focusRef} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
      <Tabs>
        <TabList>
          <Tab>Chats</Tab>
          <Tab>Contacts</Tab>
          <Tab>Find Users</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <VStack height="100%" flexGrow="1" spacing={0}>
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
