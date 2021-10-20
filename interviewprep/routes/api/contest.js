const express = require("express");
const router = express.Router();

const contestController = require("../../controllers/contestController");

router.get('/',contestController.getContests);
router.get('/ou',contestController.stopStalkApi);


module.exports = router;