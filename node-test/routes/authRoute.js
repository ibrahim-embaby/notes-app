const {
  signupCtrl,
  loginCtrl,
  verifyEmailCtrl,
} = require("../controllers/authController");

const router = require("express").Router();

router.post("/signup", signupCtrl);

router.post("/login", loginCtrl);

router.post("/verify-email", verifyEmailCtrl);

module.exports = router;
