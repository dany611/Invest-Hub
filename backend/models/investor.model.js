const mongoose = require('mongoose');


const investorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    preferredIndustries: { type: String, required: true },

    location: { type: String, required: true },

    investmentRange: { 
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    },
    email: {
        type: String,
        required: true,
        unique: true,
      },
    
    password: {
        type: String,
        required: true,
    },
},{
    timestamps: true
});

const Investor = mongoose.model('Investor', investorSchema);

module.exports = Investor