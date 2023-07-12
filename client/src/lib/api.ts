import axios from "axios";
import { g_chat } from "../types/types";
import { API_BASE_URL } from "./globals";

export const fetchUsers = async (
  resultsAction: (...args: any) => any,
  setLoadingFunction: (arg0: boolean) => void,
  query: string
) => {
  try {
    setLoadingFunction(true);
    const res = await axios.get(API_BASE_URL + "/users/search?query=" + query, {
      withCredentials: true,
    });
    resultsAction(res.data);
    setLoadingFunction(false);
  } catch (err: any) {
    console.error(err.response.data);
  }
};

export const addContact = async (id: string) => {
  try {
    const { data } = await axios.post(
      API_BASE_URL + "/contacts",
      { contactId: id },
      { withCredentials: true }
    );
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

export const removeContact = async (id: string) => {
  try {
    const { data } = await axios.delete(API_BASE_URL + "/contacts", {
      withCredentials: true,
      data: { contactId: id },
    });
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

export const getChats = async (
  responseAction: (arg0: g_chat[]) => void
): Promise<void> => {
  try {
    const { data } = await axios.get(API_BASE_URL + "/chats", {
      withCredentials: true,
    });
    responseAction(data);
  } catch (error) {
    console.error(error);
  }
};
export const getContacts = async (
  responseAction: (arg0: { id: string; username: string }[]) => void
): Promise<void> => {
  try {
    const res = await axios.get(API_BASE_URL + "/contacts", {
      withCredentials: true,
    });
    console.log("res:", res);
    responseAction(res.data);
  } catch (error) {
    console.error(error);
  }
};
