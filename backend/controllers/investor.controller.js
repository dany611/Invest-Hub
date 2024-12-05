const Investor = require("../models/investor.model");
const Business = require("../models/business.model");
const { hashPassword } = require("../util");

exports.createInvestor = async (req, res) => {
    try {


        const { name, location, preferredIndustries, minInvestmentRange, maxInvestmentRange, email, password } = req.body;

        const businessExists = await Business.findOne({ email });

        const investorExists = await Investor.findOne({ email });

        if(businessExists || investorExists){
            return res.status(400).json({ message: "Email already exists" });
        }

        if (!name || !location || !preferredIndustries  || !minInvestmentRange || !maxInvestmentRange || !email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const hash = await hashPassword(password);


        const investor = new Investor({
            name,
            preferredIndustries,
            location,
            investmentRange : {
                min: minInvestmentRange,
                max: maxInvestmentRange
            },
            email,
            password: hash
        });


        await investor.save();

        res.status(201).json({ message: "Investor created successfully" });

    
    } catch (error) {
        res.status(500).json({ message: error.message || "Something went wrong" });
    }

};
