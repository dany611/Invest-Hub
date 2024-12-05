const { findMatchProfiles } = require("../controllers/match.controller");
const authenticateJWT = require("../auth");

const router = require("express").Router();

router.get("/", authenticateJWT,  findMatchProfiles);

module.exports = router;
