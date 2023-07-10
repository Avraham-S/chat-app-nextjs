const userModels = require("../models/usersModels");

const signup = async (req: any, res: any): Promise<void> => {
  try {
    const user = await userModels.addUser(req.body);
    const reponseData = {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    res.send(reponseData);
  } catch (err: any) {
    res.status(500).send({ error: err.message });
    console.log(err);
  }
};

const login = async (req: any, res: any) => {
  try {
    const user = await userModels.validateUser(req.body);
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
    const response = await userModels.getUserById(id);
    if (response.err) {
      throw new Error(response.err);
    }
    const { user } = response;
    const reponseData = {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    res.send(reponseData);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send({ error: err.message });
  }
};
module.exports = { signup, login, auth };
