const jwt = require("jsonwebtoken");
const jwtSecret = "vinithcapavagada"; // Ensure to use environment variables in production

const authenticateToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, jwtSecret);
    req.user = verified.user;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = authenticateToken;
