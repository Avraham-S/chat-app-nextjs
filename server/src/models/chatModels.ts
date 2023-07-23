import { PrismaClient } from "@prisma/client";
import { getUsersById } from "./usersModels";
const prisma: PrismaClient = new PrismaClient();

const newChat = async (data: { name: string; users: string[] }) => {
  try {
    console.log(data);
    // const users = await getUsersById(data.users);
    const chat = await prisma.g_chat.create({
      data: {
        name: data.name,
        Users: { connect: data.users.map((id: any) => ({ id })) },
      },
    });
    console.log("chat", chat);

    return { chat };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

const getUserChats = async (
  userId: string
): Promise<{ chats?: any; error?: any }> => {
  try {
    const chats = await prisma.g_chat.findMany({
      where: {
        Users: {
          some: {
            id: userId,
          },
        },
      },
    });
    return { chats };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export { newChat, getUserChats };
