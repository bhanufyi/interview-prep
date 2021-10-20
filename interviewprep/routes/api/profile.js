const express = require("express");
const router = express.Router();
const passport = require("passport");
const profileController = require("../../controllers/profileController");

router.get("/test", (req, res) => res.json({ message: "profile works!" }));

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileController.getProfile
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileController.postProfile
);

router.get('/handle/:handle',profileController.getPublicProfile);


router.get("/all", profileController.getAllProfiles);


router.post('/experience',passport.authenticate('jwt',{session:false}),profileController.postProfileExperience);

router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  profileController.postProfileEducation,
);


router.delete(
    "/experience/:exp_id",passport.authenticate('jwt',{session:false}),profileController.deleteExperience
)


router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  profileController.deleteEducation
);



router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileController.deleteProfile
);


router.post("/uploadResume",passport.authenticate('jwt',{session:false}),profileController.uploadResume);
router.delete(
  "/deleteResume/:id",
  passport.authenticate("jwt", { session: false }),
  profileController.deleteResume
);

router.get(
  "/viewResume",
  passport.authenticate("jwt", { session: false }),
  profileController.viewResume
);


module.exports = router;
