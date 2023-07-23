import React from "react";
import { Text, VStack, Spinner, Box, IconButton } from "@chakra-ui/react";
import { AddIcon, MinusIcon, SearchIcon } from "@chakra-ui/icons";
import { User } from "../types/types";
import { addContact, removeContact } from "../lib/api";

export const UserListItem = ({
  result,
  user,
  updateUser,
}: {
  result: { id: string; username: string };
  user: User | null;
  updateUser: () => Promise<void>;
}) => {
  const [isContact, setIsContact] = React.useState<boolean>(
    !!user?.contactsIds.includes(result.id)
  );

  React.useEffect(() => {
    console.log("user?.contactsIds", user?.contactsIds);
    setIsContact(!!user?.contactsIds.includes(result.id));
  }, [user?.contactsIds]);

  return (
    <Box
      key={result.id}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      paddingY={2}
      paddingX={4}
      borderRadius={4}
      width={"95%"}
      backgroundColor={"gray.100"}
      _hover={{
        backgroundColor: "gray.200",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
      }}
    >
      <Text textAlign={"center"} color={"black"}>
        {result.username}
      </Text>
      {isContact ? (
        <IconButton
          size="xs"
          aria-label="remove"
          icon={<MinusIcon />}
          bg="gray.200"
          onClick={async () => {
            // user?.contactsIds.filter((id) => id !== result.id);
            await removeContact(result.id);
            await updateUser();
            setIsContact(!!user?.contactsIds.includes(result.id));
          }}
        />
      ) : (
        <IconButton
          size="xs"
          aria-label="Add"
          bg="gray.100"
          _hover={{ backgroundColor: "gray.100" }}
          icon={<AddIcon />}
          onClick={async () => {
            // user?.contactsIds.concat(result.id);
            await addContact(result.id);
            await updateUser();

            setIsContact(!!user?.contactsIds.includes(result.id));
          }}
        />
      )}
    </Box>
  );
};
