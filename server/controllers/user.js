const User = require('../models/user')
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

const LoginUser = async(req, res) => {
    const user = await User.findOne({email: req.body.email})
    if (!user) return res.status(404).json({msg:"user not found"})

        const isMatched = await bcrypt.compare(req.body.password, user.password)
        if (!isMatched) return res.status(401).json({msg:" Password does not match"})
            const token = jwt.sign({id : user._id},process.env.SECRET_KEY)
        return res.json({token, user, isLoggedIn: true})
  }


  const registerNewUser = async (req, res) => {
    console.log("📥 Received Request Body:", req.body);

    try {
        const { fullName, email, userName, phoneNumber, password } = req.body;

        if (!userName || userName.trim() === "") {
            return res.status(400).json({ msg: "Username is required!" });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullName,
            email: email.toLowerCase().trim(), // Ensures consistent email formatting
            userName: userName.trim(),
            phoneNumber,
            password: hashedPassword,
        });

        await newUser.save();
        console.log("✅ User Created:", newUser);
        return res.status(201).json({ msg: "User registered successfully!" });

    } catch (error) {
        if (error.code === 11000) { // MongoDB duplicate key error
            console.error("❌ Duplicate Key Error:", error.keyValue);
            if (error.keyValue.email) {
                return res.status(409).json({ msg: "Email already exists" });
            }
            if (error.keyValue.userName) {
                return res.status(409).json({ msg: "Username already exists" });
            }
        }
        console.error("❌ Registration Server Error:", error);
        return res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
};


module.exports = {registerNewUser , LoginUser};