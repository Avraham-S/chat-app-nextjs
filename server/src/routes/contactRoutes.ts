const { Router } = require("express");
const userControllers = require("../controllers/usersControllers");
const authMiddleware = require("../middlewares/authorize");
const router = Router();

router.post("/", authMiddleware.authorizeToken, userControllers.addContact);

router.delete(
  "/",
  authMiddleware.authorizeToken,
  userControllers.removeContact
);

router.get("/", authMiddleware.authorizeToken, userControllers.getContacts);

module.exports = router;
export {};
