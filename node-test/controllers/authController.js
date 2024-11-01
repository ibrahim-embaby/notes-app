const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const { models } = require("mongoose");

/**
 * @description signup user
 * @route /auth/signup
 * @method POST
 * @access public
 */
const signupCtrl = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userIsFound = await User.findOne({ email });
    if (userIsFound) {
      return res.status(400).json({ message: "user already exist" });
    }

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // send email
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);
    const link = `http://localhost:5173/account/activate/${token}`;
    await sendEmail(
      newUser.email,
      link,
      newUser.name,
      "verify your email",
      "verifyemail"
    );

    res.status(201).json({
      success: true,
      message: "success, check your email and activate your account",
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description login user
 * @route /auth/login
 * @method POST
 * @access public
 */
const loginCtrl = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "password not match" });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

    res.status(200).json({ message: "success", user: { ...user._doc, token } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

/**
 * @description verify email
 * @route /auth/verify-email
 * @method POST
 * @access public
 */
const verifyEmailCtrl = async (req, res) => {
  try {
    const token = req.body.token;
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(payload.id);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "invalid verification link" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        isActivated: true,
      },
      { new: true }
    );

    const userToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

    res.status(200).json({
      success: true,
      message: "User verified",
      user: { ...updatedUser._doc, token: userToken },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * @description send verification email
 * @route /auth/send-verification-email
 * @method POST
 * @access public
 */
const sendVerificationEmailCtrl = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    const link = `http://localhost:5173/account/activate/${token}`;
    await sendEmail(
      user.email,
      link,
      user.name,
      "verify your email",
      "verifyemail"
    );

    res.status(200).json({ success: true, message: "email was sent" });
  } catch (error) {}
};

module.exports = {
  signupCtrl,
  loginCtrl,
  verifyEmailCtrl,
  sendVerificationEmailCtrl,
};
