const mongoose = require("mongoose");
const Profile = require("../models/Profile");
const Resume = require("../models/Resume");
const User = require("../models/User");

const path = require("path");
const fs = require("fs");

const validateProfileInput = require("../validators/profile");

const validateExperienceInput = require("../validators/experiencevalidation");
const validateEducationInput = require("../validators/educationvalidation");

const multer = require("multer");

//multer storage
let resumeStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/pdfs/");
  },
  filename: (req, file, cb) => {
    const dashedFileName = file.originalname
      .trim()
      .toLowerCase()
      .split(" ")
      .join("_");
    cb(null, `${Date.now()}_${req.user.id}-${dashedFileName}`);
  },
});

const upload = multer({
  storage: resumeStorage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".pdf") {
      return cb("only pdfs  are allowed", false);
    }
    cb(null, true);
  },
  limits: {
    files: 1,
    fileSize: 1024 * 1024,
  },
}).single("resume");

exports.uploadResume = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    const url = req.protocol + "://" + req.get("host") + "/";
    console.log(res.req.file);

    const newFile = new Resume({
      user: req.user.id,
      file: { ...res.req.file },
      externalUrl: url + res.req.file.path.replace(/\\/g, "/"),
    });
    try {
      const resume = await newFile.save();
      return res.json({
        success: true,
        id: resume.id,
        externalurl: resume.externalUrl,
        originalname: resume.originalname,
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  });
};

exports.viewResume = (req, res) => {
  Resume.findOne({ user: req.user.id })
    .populate("user", ["name"])
    .then((resume) => {return res.json({id:resume.id,name:resume.user.name,externalurl:resume.externalUrl})})
    .catch((err) => res.status(400).json({error:"error fetching resume"}));
};

exports.deleteResume = (req, res) => {
  Resume.findById(req.params.id).then((resume) => {
    try {
      if (!resume) throw new Error("no resume found");
      if (req.user.id === resume.user.toString()) {
        const filePath = path.join(__basedir, resume.file.get("path"));
        fs.stat(filePath, (err, stats) => {
          if (err) throw err;
          console.log(JSON.stringify(stats));
          fs.unlink(filePath, (err) => {
            if (err) throw err;
            resume
              .remove()
              .then(() =>
                res.json({ success: "successfully deleted the resume" })
              )
              .catch((err) =>
                res
                  .status(400)
                  .json({ error: " error while deleting the resume" })
              );
          });
        });
      } else {
        res.status(403).json({ error: "forbidden operation" });
      }
    } catch (e) {
      console.log("in catch block");
      return res.status(400).json({ error: e.message });
    }
  });
};

//@route GET api/profile
// @desc get current users profile
// @access Private

exports.getProfile = (req, res, next) => {
  const errors = {};
  Profile.findOne({ user: req.user.id })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch((err) => res.status(404).json(err));
};

exports.postProfile = (req, res, next) => {
  const { errors, isValid } = validateProfileInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.githubusername)
    profileFields.githubusername = req.body.githubusername;
  // Skills - split into arry
  if (typeof req.body.skills !== "undefined") {
    profileFields.skills = req.body.skills.split(",");
  }

  // Social
  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;

  profileFields.coding = {};
  if(req.body.codechef) profileFields.coding.codechef = req.body.codechef;
  if(req.body.leetcode) profileFields.coding.leetcode = req.body.leetcode;
  

  Profile.findOne({ user: req.user.id }).then((profile) => {
    if (profile) {
      //edit
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).then((profile) => res.json(profile));
    } else {
      //create

      //check if handle exists
      Profile.findOne({ handle: profileFields.handle }).then((profile) => {
        if (profile) {
          errors.handle = "That handle already exists";
          res.status(400).json(errors);
        }

        new Profile(profileFields).save().then((profile) => res.json(profile));
      });
    }
  });
};

/// api/profile/handle/:handle in front end we need not mention /handle/:handle

/// @access Public

exports.getPublicProfile = (req, res, next) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.handle = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch((err) => res.status(404).json(err));
};

exports.getProfileByUserId = (req, res, next) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.profile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch((err) =>
      res.status(404).json({ profile: "there is no profile of this user" })
    );
};

/// GET api/profile/all
// Public

exports.getAllProfiles = (req, res, next) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then((profiles) => {
      if (!profiles) {
        errors.profiles = "There are no profiles";
        return res.status(404).json(errors);
      }

      return res.json(profiles);
    })
    .catch((err) => res.status(404).json({ profile: "There are no profiles" }));
};

/// @route POST api/profile/experience
// @desc add experience to profile
// @access private

exports.postProfileExperience = (req, res, next) => {
  const { errors, isValid } = validateExperienceInput(req.body);
  if (!isValid) {
    return res.status(404).json(errors);
  }

  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };

      // Add to exp array
      profile.experience.unshift(newExp);
      profile.save().then((profile) => res.json(profile));
    })
    .catch((err) => res.status(400).json(err));
};

/// @route POST api/profile/experience
// @desc add experience to profile
// @access private

exports.postProfileEducation = (req, res, next) => {
  const { errors, isValid } = validateEducationInput(req.body);
  if (!isValid) {
    return res.status(404).json(errors);
  }

  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };

      // Add to exp array
      profile.education.unshift(newEdu);
      profile.save().then((profile) => res.json(profile));
    })
    .catch((err) => res.status(400).json(err));
};

/// @route DELETE api/profile/experience/:exp_id
/// @access Private

exports.deleteExperience = (req, res, next) => {
  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      const removeIndex = profile.experience
        .map((item) => item.id)
        .indexOf(req.params.exp_id);

      // splice out of array

      profile.experience.splice(removeIndex, 1);

      profile.save().then((profile) => res.json(profile));
    })
    .catch((err) => res.status(404).json(err));
};

exports.deleteEducation = (req, res, next) => {
  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      const removeIndex = profile.education
        .map((item) => item.id)
        .indexOf(req.params.edu_id);

      // splice out of array

      profile.education.splice(removeIndex, 1);

      profile.save().then((profile) => res.json(profile));
    })
    .catch((err) => res.status(404).json(err));
};

exports.deleteProfile = (req, res, next) => {
  Profile.findOneAndRemove({ user: req.user.id }).then(() => {
    User.findOneAndRemove({ _id: req.user.id }).then(() =>
      res.json({ success: true })
    );
  });
};
