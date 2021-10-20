const express = require("express");
const router = express.Router();
const passport = require("passport");

const githubController = require('../../controllers/githubController');

router.post('/stats/:username',passport.authenticate('jwt',{session:false}),githubController.githubProfile);

module.exports = router;