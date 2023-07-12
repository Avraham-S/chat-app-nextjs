const { Router } = require("express");
const chatControllers = require("../controllers/chatsControllers");
const authMiddleware = require("../middlewares/authorize");

const router = Router();

router.get("/", authMiddleware.authorizeToken, chatControllers.getChats);

module.exports = router;
export {};
