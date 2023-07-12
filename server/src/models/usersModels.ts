import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

interface SignupFormInfo {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}
interface LoginFormInfo {
  email: string;
  password: string;
}
const addUser = async (
  data: SignupFormInfo
): Promise<{ user?: any; error?: any }> => {
  try {
    const { username, email, password } = data;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    return { user };
  } catch (error) {
    return { error };
  }
};

const validateUser = async (
  data: LoginFormInfo
): Promise<{ user?: any; error?: any }> => {
  try {
    const { email, password } = data;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    console.log("user in validate user model", user);
    if (!user) {
      throw new Error("User not found");
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error("Invalid password");
    }
    console.log("user in model", user);
    return { user };
  } catch (error) {
    return { error };
  }
};

const generateToken = (user: any) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      contactIds: user.contactIds,
    },
    process.env.JWT_SECRET
  );
  return token;
};

const getUserById = async (
  id: string
): Promise<{ user?: any; error?: any }> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return { user };
  } catch (error) {
    return { error };
  }
};

const getUsersById = async (
  idArray: string[]
): Promise<{ users?: any[]; error?: any }> => {
  try {
    const users: any = await Promise.all(
      idArray.map(async (userId: any) => {
        return await prisma.user.findUnique({
          where: {
            id: userId,
          },
        });
      })
    );
    return { users };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

const addContact = async (
  userId: string,
  contactId: string
): Promise<{ contactIds?: string[]; error?: any }> => {
  try {
    const { user, error } = await getUserById(userId);
    if (error) throw new Error(error);

    if (user?.contactsIds.includes(contactId))
      throw new Error("Contact already exists");

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        contactsIds: {
          push: contactId,
        },
      },
    });
    return { contactIds: updatedUser.contactsIds };
  } catch (error: any) {
    console.error(error);
    return { error };
  }
};

const removeContact = async (
  userId: string,
  contactId: string
): Promise<{ contactIds?: string[]; error?: any }> => {
  try {
    const { user, error } = await getUserById(userId);
    if (!user?.contactsIds.includes(contactId))
      throw new Error("Contact does not exist");

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        contactsIds: {
          set: user.contactsIds.filter((id: string) => id !== contactId),
        },
      },
    });
    return { contactIds: updatedUser.contactsIds };
  } catch (error: any) {
    console.error(error);
    return { error };
  }
};

module.exports = {
  addUser,
  validateUser,
  generateToken,
  getUserById,
  getUsersById,
  addContact,
  removeContact,
};
export {
  addUser,
  validateUser,
  generateToken,
  getUserById,
  getUsersById,
  addContact,
  removeContact,
};
