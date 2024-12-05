const ChatEvent = require("../models/chat-event.model");
const Chat = require("../models/chat.model");

exports.findChatEvents = async function (req, res) {
    try {

        let chat = await Chat.findOne({
            business: req.params.businessId,
            investor: req.params.investorId
        });

        if (!chat) {
            await Chat.create({
                business: req.params.businessId,
                investor: req.params.investorId,

            })
            chat = await Chat.findOne({
                business: req.params.businessId,
                investor: req.params.investorId
            });
        }

        const ChatEvents = await ChatEvent.find({
            chat: chat._id
        })

        res.status(200).json({ events: ChatEvents });

    } catch (error) {
        res.status(500).json({ message: error.message || "Something went wrong" });
    }
}

exports.createChatEvent = async function (message, senderType, investorId, businessId) {
    try {

        let chat = await Chat.findOne({
            business: businessId,
            investor: investorId
        });

        if (!chat) {
            await Chat.create({
                business: businessId,
                investor: investorId
            })
            chat = await Chat.findOne({
                business: req.params.businessId,
                investor: req.params.investorId
            });
        }
        await ChatEvent.create({
            chat: chat._id,
            senderType,
            message
        })

    }
    catch (error) {
        console.log(error);
    }
}
