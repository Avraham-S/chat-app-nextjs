const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
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
const addUser = async (data: SignupFormInfo) => {
  try {
    const { username, email, password } = data;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await prisma.users.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    return user;
  } catch (err) {
    return err;
  }
};

const validateUser = async (data: LoginFormInfo) => {
  try {
    const { email, password } = data;
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error("Invalid password");
    }
    console.log("user in model", user);
    return user;
  } catch (err) {
    return err;
  }
};

const generateToken = (user: any) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET
  );
  return token;
};

module.exports = { addUser, validateUser, generateToken };
