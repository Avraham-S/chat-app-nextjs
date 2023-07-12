const userModels: {
  addUser: (arg0: any) => Promise<{ user?: any; error?: any }>;
  validateUser: (arg0: any) => Promise<{ user?: any; error?: any }>;
  generateToken: (arg0: any) => string;
  getUserById: (arg0: any) => Promise<{ user?: any; error?: any }>;
  getUsersById: (arg0: any) => Promise<{ users?: any; error?: any }>;
  addContact: (
    arg0: any,
    arg1: any
  ) => Promise<{ contactsIds?: any; error?: any }>;
  removeContact: (
    arg0: any,
    arg1: any
  ) => Promise<{ contactsIds?: any; error?: any }>;
  getUsersByUsername: (arg0: any) => Promise<{ users?: any; error?: any }>;
} = require("../models/usersModels");

const signup = async (req: any, res: any): Promise<void> => {
  try {
    const { user, error } = await userModels.addUser(req.body);
    if (error) throw new Error(error);
    const reponseData = {
      id: user.id,
      username: user.username,
      email: user.email,
      contactsIds: user.contactsIds,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    console.log("response data in model:", reponseData);
    const token = userModels.generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.send(reponseData);
  } catch (err: any) {
    res.status(500).send({ error: err.message });
    console.log(err);
  }
};

const login = async (req: any, res: any) => {
  try {
    const { user, error } = await userModels.validateUser(req.body);
    if (error) throw new Error(error);
    const token = userModels.generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    console.log("user in controller", user);
    const reponseData = {
      id: user.id,
      username: user.username,
      email: user.email,
      contactsIds: user.contactsIds,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    console.log(reponseData);
    res.send(reponseData);
  } catch (err: any) {
    res.status(500).send({ error: err.message });
    console.log(err);
  }
};

const auth = async (req: any, res: any) => {
  try {
    const { id } = req.user;
    const { user, error } = await userModels.getUserById(id);
    console.log("user in controller", user);
    if (error) throw new Error(error);
    const reponseData = {
      id: user.id,
      username: user.username,
      email: user.email,
      contactsIds: user.contactsIds,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    res.send(reponseData);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send({ error: err.message });
  }
};

const getContacts = async (req: any, res: any) => {
  try {
    console.log("req.user", req.user);
    const { id } = req.user;
    const { user } = await userModels.getUserById(id);
    const { users, error } = await userModels.getUsersById(user.contactsIds);

    console.log("users", users);
    if (error) throw new Error(error);
    const reponseData = users.map((contact: any) => ({
      id: contact.id,
      username: contact.username,
    }));
    console.log("reponseData", reponseData);
    res.send(reponseData);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send({ error: error.message });
  }
};

const addContact = async (req: any, res: any) => {
  try {
    const { id } = req.user;
    const { contactId } = req.body;
    const { contactsIds, error } = await userModels.addContact(id, contactId);
    if (error) throw new Error(error);
    res.send({ message: "Contact added", contactsIds });
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
};

const removeContact = async (req: any, res: any) => {
  try {
    const { id } = req.user;
    const { contactId } = req.body;
    console.log("body:", req.body);
    const { contactsIds, error } = await userModels.removeContact(
      id,
      contactId
    );
    if (error) throw new Error(error);
    res.send({ message: "Contact removed", contactsIds });
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
};

const searchUsers = async (req: any, res: any) => {
  try {
    const { query } = req.query;
    console.log("query", query);
    console.log("req.params", req.params);
    const { users, error } = await userModels.getUsersByUsername(query);
    if (error) throw new Error(error);
    const reponseData = users.map((user: any) => ({
      id: user.id,
      username: user.username,
    }));
    res.send(reponseData);
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  signup,
  login,
  auth,
  getContacts,
  addContact,
  removeContact,
  searchUsers,
};
