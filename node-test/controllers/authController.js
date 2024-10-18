const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @description signup user
 * @route /auth/signup
 * @method POST
 * @access public
 */
const signupCtrl = async (req, res) => {
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

  res.status(201).json({ message: "success", user: newUser });
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

module.exports = {
  signupCtrl,
  loginCtrl,
};
