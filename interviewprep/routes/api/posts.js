const express = require("express");
const router = express.Router();
const passport = require('passport');
//@route GET api/posts/test 
 // @route public

 const postscontroller = require("../../controllers/postsController");

 //router.post("/login", authcontroller.login);
 //router.post("/signup", authcontroller.postsignup);
    //router.get("/test", (req, res) => res.json({ message: "posts works!" }));
router.get('/test',postscontroller.test);

router.post('/',passport.authenticate('jwt',{session:false}),postscontroller.postApost);
router.get(
  "/",
  postscontroller.getPosts
);

router.get("/:id", postscontroller.getPostsById);

router.delete('/:id',passport.authenticate(
    'jwt',{session:false}
),postscontroller.deletePostById);

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  postscontroller.likePost
);


router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  postscontroller.unlikePost
);


router.post("/comment/:id",passport.authenticate('jwt',{session:false}),postscontroller.comment);

router.delete(
  "/comment/:id/:comments_id",
  passport.authenticate("jwt", { session: false }),
  postscontroller.deletecomment
);

router.post('/uploadfiles',passport.authenticate('jwt',{session:false}),postscontroller.uploadfiles);


module.exports = router;
