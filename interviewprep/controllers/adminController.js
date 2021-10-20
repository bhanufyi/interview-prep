const Post = require("../models/Post");
const User = require("../models/User");
const Media = require("../models/Media");

const keys = require("../config/keys");
const mailgun = require("mailgun-js");
const DOMAIN = keys.mailgunDomain;
const mg = mailgun({ apiKey: keys.mailgunApiKey, domain: DOMAIN });

exports.getAllPostsForAdmin = (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({ nopostsfound: "no posts to show" }));
};

exports.deletePostAndNotifyUser = (req, res) => {
  Post.findOne({ _id: req.params.postid })
    .populate("user", ["name", "email"])
    .then((post, err) => {
      if (err) throw err;
      
      const {user} = post;
      const {name, email} = user;

      if (post) {
        post
          .remove()
          .then(() => {
            
            const emailData = {
              from: "bhanurasadcherukuvada <mailgun@bhanuprasadcherukuvada.me>",
              to: email,
              subject: "Post Deletion Notice",
              html: `
        <h1>Since the post was not appropriate. We had to delete it.</h1>
           
                <hr />
                <p>This email may contain sensetive information</p>
                <p>${keys.CLIENT_URL}</p>
  `,
            };

            mg.messages().send(emailData, function (error, body) {
              console.log(body);
              if (error) {
                return res.status(400).json({
                  error:
                    "We had some issue sending the email. Please try after some time",
                });
              }
              return res.json({
                message: `Email has been sent to ${name}, notifying about the deletion of his/her post`,
              });
            });
            
          })
          .catch((err) =>
            res.status(400).json({ error: "error deleting the post" })
          );
      }
    })

    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: "db error please check" });
    });
};
