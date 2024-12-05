const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    requiredInvestment: {
        type: Number,
        required: true
    },
    contactDetails: {
        type: String,
        required: true
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

const Business = mongoose.model('Business', businessSchema);


module.exports = Business



