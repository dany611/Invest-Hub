const { createInvestor } = require("../controllers/investor.controller");

const router = require("express").Router();

router.post("/register", createInvestor);

module.exports = router;
