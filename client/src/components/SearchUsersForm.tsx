import React, { Ref, useEffect } from "react";
import { Input, Text, VStack, Spinner } from "@chakra-ui/react";

import { useUser } from "../contexts/UserContext";
import { debounce } from "../lib/helpers";
import { UserListItem } from "./UserListItem";
import { fetchUsers } from "../lib/api";

export const SearchUsersForm = ({ focusRef }: { focusRef: Ref<any> }) => {
  const [results, setResults] = React.useState<any[]>();
  const [query, setQuery] = React.useState<string>("");
  const [searching, setSearching] = React.useState<boolean>(false);
  const [user, _, updateUser] = useUser();

  const debouncedFetchUsers = debounce(fetchUsers, 500);

  useEffect(() => {
    setResults([]);
  }, []);

  useEffect(() => {
    if (!query) return setResults([]);
    debouncedFetchUsers(setResults, setSearching, query);
  }, [query]);

  return (
    <VStack spacing={2} height={"30rem"} overflow={"scroll"}>
      <form
        onSubmit={(e: any) => {
          e.preventDefault();
          fetchUsers(setResults, setSearching, query);
        }}
        style={{ width: "100%" }}
      >
        <Input
          placeholder="Search users..."
          ref={focusRef}
          onChange={(e: any) => {
            setQuery(e.target.value);
          }}
          width={"100%"}
        />
      </form>
      <VStack spacing={1} width={"100%"}>
        {searching ? (
          <Spinner />
        ) : results?.length ? (
          results?.map((result) => {
            console.log("result", result, "\n", user?.id === result.id);
            return (
              user?.id !== result.id && (
                <UserListItem
                  user={user}
                  result={result}
                  key={result.id}
                  updateUser={updateUser}
                />
              )
            );
          })
        ) : (
          query && searching && <Text>No results</Text>
        )}
      </VStack>
    </VStack>
  );
};
