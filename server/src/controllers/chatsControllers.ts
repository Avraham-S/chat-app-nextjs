const chatsModels = require("../models/chatModels");

const getChats = async (req: any, res: any) => {
  try {
    const { id } = req.user;
    const { chats, error } = await chatsModels.getUserChats(id);
    if (error) throw new Error(error);
    res.send(chats);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send({ message: err.message });
  }
};

const addChat = async (req: any, res: any) => {
  try {
    const { id } = req.user;
    const { userId } = req.body;
    const { chat, error } = await chatsModels.newChat(id, userId);
    if (error) throw new Error(error);
    res.send(chat);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send({ message: err.message });
  }
};
module.exports = {
  getChats,
  addChat,
};

export {};
