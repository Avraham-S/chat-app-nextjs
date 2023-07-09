const { Router } = require("express");
const userControllers = require("../controllers/usersControllers");

const router = Router();

router.post("/signup", userControllers.signup);
router.post("/login", userControllers.login);

module.exports = router;
