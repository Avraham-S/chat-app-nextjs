const authorizeToken = async (req: any, res: any, next: any) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new Error("No token provided");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err: any) {
    res.status(401).send({ error: err.message });
  }
};
module.exports = { authorizeToken };
