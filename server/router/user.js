const router = require("express").Router();
const authController = require("./users/auth");

router.get("/", (req, res) => {});

router.use("/auth", authController);

module.exports = router;
