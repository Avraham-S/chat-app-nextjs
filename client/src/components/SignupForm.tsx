import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import { API_BASE_URL } from "../lib/globals";
import { SignupFormInfo } from "../types/types";

export const SignupForm = () => {
  const [formInfo, setFormInfo] = React.useState<SignupFormInfo>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
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
        <FormLabel>
          Email
          <Input
            type="email"
            placeholder="example@email.com"
            isRequired={true}
            name="email"
          />
        </FormLabel>
        <FormLabel>
          Username
          <Input
            type="text"
            placeholder="Username"
            isRequired={true}
            name="username"
          />
        </FormLabel>
        <FormLabel>
          Password
          <Input
            type="password"
            placeholder="somepassword"
            isRequired={true}
            name="password"
          />
        </FormLabel>
        <FormLabel>
          Confirm Password
          <Input
            type="password"
            placeholder="somepassword"
            isRequired={true}
            name="confirmPassword"
          />
        </FormLabel>
        <HStack justifyContent="flex-end">
          <Button
            type="submit"
            isLoading={isLoading}
            onClick={async (e) => {
              e.preventDefault();
              try {
                setIsLoading(true);
                console.log(formInfo);
                if (formInfo.password !== formInfo.confirmPassword) {
                  throw new Error("Passwords do not match");
                }
                // send request to server
                const response = await axios.post(
                  API_BASE_URL + "/users/signup",
                  formInfo,
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                    withCredentials: true,
                  }
                );
                console.log(response);
                const { data } = response;
                console.log(data);
                setUser(data);
                // if successful, redirect to home page
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
            Sign Up
          </Button>
        </HStack>
      </form>
    </FormControl>
  );
};
