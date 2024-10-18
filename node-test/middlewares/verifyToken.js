const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(400).json({ message: "no token" });
    }
    const userVerified = jwt.verify(token, process.env.SECRET_KEY);

    if (!userVerified) {
      return res.status(400).json({ message: "user not authenticated" });
    }

    req.userId = userVerified.id;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  verifyToken,
};
