const { createBusiness } = require("../controllers/business.controller");

const router = require("express").Router();

router.post("/register", createBusiness);

module.exports = router;