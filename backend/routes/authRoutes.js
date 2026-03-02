const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

router.post("/register", (req, res, next) => {
  console.log("Register route hit", req.body);
  next();
}, register);
router.post("/login", login);

module.exports = router;