const User = require("../models/User");
const bcrypt = require("bcryptjs");


exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;


    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });


    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await User.create({ email, password: hashedPassword });

    res.status(201).json({ message: "User created", user });
  } catch (err) {
  console.log("Register Error:", err.message);  
  res.status(500).json({ error: err.message });
}
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

   
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};