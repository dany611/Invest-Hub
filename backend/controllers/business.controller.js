
const Business = require("../models/business.model");
const Investor = require("../models/investor.model");
const { hashPassword } = require("../util");

exports.createBusiness = async (req, res) => {
    try {

    
        const { name, industry, location, requiredInvestment, contactDetails, email, password } = req.body;

        const businessExists = await Business.findOne({ email });

        const investorExists = await Investor.findOne({ email });

        if(businessExists || investorExists){
            return res.status(400).json({ message: "Email already exists" });
        }

        if (!name || !industry || !location || !requiredInvestment || !contactDetails || !email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const hash = await hashPassword(password);

        const business = new Business({
            name,
            industry,
            location,
            requiredInvestment,
            contactDetails,
            email,
            password: hash
        });

        await business.save();

        res.status(201).json({ message: "Business created successfully" });

    
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || "Something went wrong" });
    }

};
