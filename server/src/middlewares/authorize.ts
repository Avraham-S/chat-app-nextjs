const jwtoken = require("jsonwebtoken");

const authorizeToken = async (req: any, res: any, next: any) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new Error("No token provided");
    }
    const decoded = jwtoken.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (err: any) {
    console.log(err.message);
    res.status(401).send({ error: err.message });
  }
};
module.exports = { authorizeToken };
