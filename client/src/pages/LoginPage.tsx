import React from "react";
import { LoginForm } from "../components/LoginForm";
import { SignupForm } from "../components/SignupForm";
import { Box } from "@chakra-ui/react";

export const LoginPage = () => {
  const [isNewUser, setIsNewUser] = React.useState<boolean>(true);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
        flexDirection: "column",
      }}
    >
      {isNewUser ? <SignupForm /> : <LoginForm />}
      <Box
        style={{
          cursor: "pointer",
        }}
        _hover={{
          textDecoration: "underline",
        }}
        onClick={() => {
          setIsNewUser(!isNewUser);
        }}
      >
        {isNewUser ? "Already have an account?" : "Don't have an account?"}
      </Box>
    </div>
  );
};
