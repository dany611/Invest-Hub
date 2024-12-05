const mongoose = require('mongoose');

const chatEventSchema = new mongoose.Schema({

    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    },

    senderType : {
        type: String,
        required: true
    },

    message : {
        type: String,
        required: true
    },
    

    isDeleted : {
        type: Boolean,
        default: false
    },

}, {
    timestamps: true
});

const Chat = mongoose.model('ChatEvent', chatEventSchema);

module.exports = Chat