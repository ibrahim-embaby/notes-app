const { signupCtrl, loginCtrl } = require("../controllers/authController");

const router = require("express").Router();

router.post("/signup", signupCtrl);

router.post("/login", loginCtrl);

module.exports = router;
