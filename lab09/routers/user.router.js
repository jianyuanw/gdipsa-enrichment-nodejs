const express = require("express");
const User = require("../models/user.model");
const auth = require("../middleware/auth");
const router = express.Router();

// Register
router.post("/users", async (req, res) => {
  console.log(`Request body: ${JSON.stringify(req.body)}`);
  try {
    const user = new User(req.body);
    await user.save();
    console.log(`Saved user: ${JSON.stringify(user)}`);
    const token = await user.generateAuthToken();
    res.status(201).send({ email: user.email, token });
  } catch (err) {
    console.log(err.stack);
    res.status(500).send({ error: err.message });
  }
});

// Login
router.post("/users/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findByCredentials(email, password);
    if (!user) {
      return res.status(401).send({ error: "Login failed!" });
    }
    const token = await user.generateAuthToken();
    res.send({ email, token });
  } catch (err) {
    console.log(err.stack);
    res.status(400).send({ error: err.message });
  }
});

// Display logged in user's own profile
router.get("/users/profile", auth, (req, res) => {
  res.send(`Profile: ${JSON.stringify(req.user)}`);
});

module.exports = router;
