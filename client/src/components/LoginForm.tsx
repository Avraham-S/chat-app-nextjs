import React from "react";
import axios from "axios";
import { API_BASE_URL } from "../lib/globals";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useUser } from "../contexts/UserContext";
import { LoginFormInfo } from "../types/types";
import { validateEmail } from "../lib/helpers";

export const LoginForm = () => {
  const [formInfo, setFormInfo] = React.useState<LoginFormInfo>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const formRef = React.useRef<HTMLFormElement>(null);
  const [_, setUser] = useUser();
  const [emailError, setEmailError] = React.useState<boolean>(false);
  //USE FOR SIGN UP FORM//
  // const [errorState, setErrorState] = React.useState<{
  //   emailError: boolean;
  //   passwordError: boolean;
  // }>({ emailError: false, passwordError: false });

  const validateForm = (formData: LoginFormInfo) => {
    const emailIsValid = validateEmail(formData.email);
    if (!emailIsValid) {
      setEmailError(true);
      return false;
    } else setEmailError(false);
    return true;
  };

  return (
    <form
      onChange={(e: any) => {
        setFormInfo({
          ...formInfo,
          [e.target.name]: e.target.value,
        });
      }}
      ref={formRef}
      // padding={4}
      style={{ width: "100%", padding: "1rem" }}
    >
      <FormControl isInvalid={emailError}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="example@email.com"
          isRequired={true}
          name="email"
        />
        <FormErrorMessage>Invalid Email</FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          placeholder="somepassword"
          isRequired={true}
          name="password"
        />
        <FormErrorMessage>Incorrect Password</FormErrorMessage>

        <HStack justifyContent="flex-end">
          <Button
            type="submit"
            isLoading={isLoading}
            onClick={async (e) => {
              e.preventDefault();
              if (!validateForm(formInfo)) return;
              try {
                setIsLoading(true);
                console.log(formInfo);
                // send request to server
                const response = await axios.post(
                  API_BASE_URL + "/users/login",
                  formInfo,
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                    withCredentials: true,
                  }
                );
                const data = response.data;
                setUser(data);
                // if not successful, present error to user
                formRef.current?.reset();
                setIsLoading(false);
              } catch (error) {
                console.error(error);
                setIsLoading(false);
                // present error to user
              }
            }}
          >
            Login
          </Button>
        </HStack>
      </FormControl>
    </form>
  );
};
