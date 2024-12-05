const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({

    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true
    },
    investor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Investor',
        required: true
    },

    isDeleted : {
        type: Boolean,
        default: false
    },

},{
    timestamps: true
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat