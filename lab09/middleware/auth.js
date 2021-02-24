const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const auth = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer", "").trim();
  console.log(`Token: ${token}`);

  try {
    const data = jwt.verify(token, process.env.JWT_KEY);
    req.user_id = data._id;
    req.token = data.token;
    req.user = await User.findById(data._id);

    next();
  } catch (err) {
    console.log(JSON.stringify(err));
    console.log(err.stack);
    res.status(401).send({ error: "Not authorized to access this resource" });
  }
};

module.exports = auth;
