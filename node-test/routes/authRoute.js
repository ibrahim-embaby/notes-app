const {
  signupCtrl,
  loginCtrl,
  verifyEmailCtrl,
  sendVerificationEmailCtrl,
  refreshTokenCtrl,
} = require("../controllers/authController");

const router = require("express").Router();

router.post("/signup", signupCtrl);

router.post("/login", loginCtrl);

router.post("/verify-email", verifyEmailCtrl);

router.post("/send-verification-email", sendVerificationEmailCtrl);

router.get("/refresh-token", refreshTokenCtrl);

module.exports = router;
