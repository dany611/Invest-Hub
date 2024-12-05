
const Investor = require("../models/investor.model");
const Business = require("../models/business.model")



async function _findMatchingBusiness(location, investmentRange) {
    return await Business.find({
        location: { $regex: new RegExp(location, "i") }, requiredInvestment: {
            $gte: investmentRange.min,
            $lte: investmentRange.max,

        },
    }).exec();

}

async function _findMatchingInvestor(location, requiredInvestment) {
    return await Investor.find({
        location: { $regex: new RegExp(location, "i") },
        "investmentRange.min": { $lte: requiredInvestment },
        "investmentRange.max": { $gte: requiredInvestment },
    }).exec();

}

exports.findMatchProfiles = async (req, res) => {

    try {

        const user = req.user;

        let matchingProfiles = [];

        if (!user.requiredInvestment) {
            matchingProfiles = await _findMatchingBusiness(user.location, user.investmentRange, user.preferredIndustries)
        } else {
            matchingProfiles = await _findMatchingInvestor(user.location, user.requiredInvestment, user.industry)
        }

        res.status(200).json({ matchingProfiles, currentUser: user });

    } catch (error) {
        res.status(500).json({ message: error.message || "Something went wrong" });
    }
}




