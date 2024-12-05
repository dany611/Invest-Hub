const { findChatEvents } = require("../controllers/chat.controller");
const authenticateJWT = require("../auth");

const router = require("express").Router();

router.get("/events/:businessId/:investorId", authenticateJWT, findChatEvents);

module.exports = router;