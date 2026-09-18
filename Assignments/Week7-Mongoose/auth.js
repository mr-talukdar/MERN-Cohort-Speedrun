const jwt = require("jsonwebtoken");

const Authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (user) {
      req.userID = user.id;
      next();
    } else {
      res.status(403).json({ message: "Incorrect Creds" });
    }
  } catch (error) {
    res.status(403).json({ message: "Invalid or missing token" });
  }
};

module.exports = { Authenticate };
