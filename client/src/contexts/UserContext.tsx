import React, { useEffect } from "react";
import { useAuth } from "./LoggedInContext";
import { User } from "../types/types";
const UserContext = React.createContext<[User | null, any] | null>(null);

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error(`useUser must be used within a UserContextProvider`);
  }
  return context;
};

export const UserContextProvider = ({ children }: any) => {
  const [user, setUser] = React.useState<User | null>(null);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};
