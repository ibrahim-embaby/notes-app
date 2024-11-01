const {
  signupCtrl,
  loginCtrl,
  verifyEmailCtrl,
  sendVerificationEmailCtrl,
} = require("../controllers/authController");

const router = require("express").Router();

router.post("/signup", signupCtrl);

router.post("/login", loginCtrl);

router.post("/verify-email", verifyEmailCtrl);

router.post("/send-verification-email", sendVerificationEmailCtrl);

module.exports = router;
