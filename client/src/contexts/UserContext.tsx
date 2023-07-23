import React from "react";
import { User } from "../types/types";
import axios from "axios";
import { API_BASE_URL } from "../lib/globals";
const UserContext = React.createContext<
  [User | null, any, () => Promise<void>] | null
>(null);

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error(`useUser must be used within a UserContextProvider`);
  }
  return context;
};

export const UserContextProvider = ({ children }: any) => {
  const [user, setUser] = React.useState<User | null>(null);
  const updateUser = async () => {
    try {
      const { data } = await axios.get(API_BASE_URL + "/users/", {
        withCredentials: true,
      });
      console.log("contact list from user update:", data);
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <UserContext.Provider value={[user, setUser, updateUser]}>
      {children}
    </UserContext.Provider>
  );
};
