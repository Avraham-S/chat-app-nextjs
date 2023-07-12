const { Router } = require("express");
const userControllers = require("../controllers/usersControllers");
const authMiddleware = require("../middlewares/authorize");

const router = Router();

router.post("/signup", userControllers.signup);

router.post("/login", userControllers.login);

router.get("/", authMiddleware.authorizeToken, userControllers.auth);

router.get(
  "/search",
  authMiddleware.authorizeToken,
  userControllers.searchUsers
);

module.exports = router;
