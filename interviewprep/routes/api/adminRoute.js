const express = require("express");
const router = express.Router();
const passport = require("passport");
const {adminMiddleware} = require("../../middleware/adminAccess");

const adminController = require("../../controllers/adminController");

// router.get(
//   "/",
  // passport.authenticate("jwt", { session: false }),
//   adminMiddleware,
//   adminController.adminOperations
// );
router.get(
  "/posts/adminview/all",
  adminMiddleware,
  adminController.getAllPostsForAdmin
);
router.delete(
  "/deletepost/:postid",
  adminMiddleware,
  adminController.deletePostAndNotifyUser
);

module.exports = router;
