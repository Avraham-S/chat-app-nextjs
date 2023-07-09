import React from "react";
import axios from "axios";
import { API_BASE_URL } from "../lib/globals";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
} from "@chakra-ui/react";
import { useUser } from "../contexts/UserContext";
import { LoginFormInfo } from "../types/types";

export const LoginForm = () => {
  const [formInfo, setFormInfo] = React.useState<LoginFormInfo>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const formRef = React.useRef<HTMLFormElement>(null);
  const [_, setUser] = useUser();

  return (
    <FormControl padding={4}>
      <form
        onChange={(e: any) => {
          setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value,
          });
        }}
        ref={formRef}
      >
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="example@email.com"
          isRequired={true}
          name="email"
        />
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          placeholder="somepassword"
          isRequired={true}
          name="password"
        />
        <HStack justifyContent="flex-end">
          <Button
            type="submit"
            isLoading={isLoading}
            onClick={async (e) => {
              e.preventDefault();
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
      </form>
    </FormControl>
  );
};
