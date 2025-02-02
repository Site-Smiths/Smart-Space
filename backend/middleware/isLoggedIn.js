const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const jwtSecret = "shh";
function isLoggedIn(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send("Unauthorized: No token provided");
  }
  jwt.verify(token, jwtSecret, async (err, decoded) => {
    if (err) {
      return res.status(401).send("Unauthorized: Invalid token");
    }
    req.user = decoded;
    const user = await userModel.findById(decoded.userid);
    if (!user) {
      return res.status(401).send("Unauthorized: User not found");
    }
    next();
  });
}

module.exports = { isLoggedIn };
