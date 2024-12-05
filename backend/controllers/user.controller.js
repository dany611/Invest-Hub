const Investor = require("../models/investor.model");
const Business = require("../models/business.model");
const jwt = require('jsonwebtoken');
const { comparePassword } = require("../util");


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        let user = await Investor.findOne({ email });

        if (!user) {
            user = await Business.findOne({ email });
        }

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // check if password is correct
        if (!(await comparePassword(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }


        // Create and send JWT token
        const token = jwt.sign(
            { user },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );


        res.status(200).json({ token });

    } catch (error) {
        res.status(500).json({ message: error.message || "Something went wrong" });
    }
}
