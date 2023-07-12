import React from "react";
import { useSocket } from "../contexts/SocketContext";
import { ChatWindow } from "../components/ChatWindow";
import { SideBar } from "../components/SideBar";
import { HStack, VStack, Spinner, Box } from "@chakra-ui/react";
import { useUser } from "../contexts/UserContext";
import { g_chat } from "../types/types";
import axios from "axios";
import { API_BASE_URL } from "../lib/globals";

const MockChats: g_chat[] = [];

export const HomePage = () => {
  const socket: any = useSocket();
  const [isConnected, setIsConnected] = React.useState<boolean>(
    socket.connected
  );
  const [chats, setChats] = React.useState<g_chat[]>(MockChats);
  const [activeChat, setActiveChat] = React.useState<g_chat | null>(chats[0]);

  const [user] = useUser();

  React.useEffect(() => {
    // console.log(socket.connected);
    socket.on("connect", () => {
      setIsConnected(socket.connected);
    });
    socket.on("disconnect", () => {
      socket.connect();
      setIsConnected(socket.connected);
    });
    if (!socket.connected) {
      socket.connect();
    }
  }, [socket.connected]);

  React.useEffect(() => {
    if (user) {
      axios
        .get(API_BASE_URL + "/chats", { withCredentials: true })
        .then((res) => {
          console.log(res.data);
          setChats(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  return (
    <VStack
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <h1>Home Page</h1>
      <h2>{activeChat?.chatName}</h2>
      <button
        onClick={() => {
          socket.emit("new-private-chat", {
            name: "New Chat",
            users: [
              "5a92d56c-9fb4-4b5f-8a00-c5ea50be5312",
              "10946be5-4148-44ec-b008-a9efa6d7f2a9",
            ],
          });
        }}
      >
        New Chat
      </button>
      <Box style={{ height: "100%", display: "flex", width: "100%" }}>
        <Box width={"30%"}>
          <SideBar
            setActiveChat={setActiveChat}
            chats={chats}
            activeChat={activeChat}
          />
        </Box>
        <Box flexGrow={1} ps={10} pe={10} pb={3}>
          {!isConnected ? (
            <Spinner hidden={socket.connected} title="connecting" />
          ) : (
            <ChatWindow socket={socket} activeChat={activeChat} chats={chats} />
          )}
        </Box>
      </Box>
    </VStack>
  );
};
