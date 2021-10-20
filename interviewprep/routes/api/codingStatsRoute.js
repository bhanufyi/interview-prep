const express = require("express");
const router = express.Router();
const passport = require("passport");
const {codeChefApi,leetcodeApi} = require('../../controllers/codingStatsController')


router.get(
  "/codechef",
  passport.authenticate("jwt", { session: false }),
  codeChefApi
);
router.get(
  "/leetcode",
  passport.authenticate("jwt", { session: false }),
  leetcodeApi
);


module.exports = router;