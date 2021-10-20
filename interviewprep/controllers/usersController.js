const User = require("../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const { OAuth2Client } = require("google-auth-library");


const mailgun = require("mailgun-js");
const DOMAIN = keys.mailgunDomain;
const mg = mailgun({ apiKey: keys.mailgunApiKey, domain: DOMAIN });



const validateRegisterInput = require("../validators/register");
const validateLoginInput = require("../validators/login");

exports.register = (req, res, next) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    errors.email = "Email already exists";
    if (user) {
      return res.status(400).json(errors);
    } else {
      const { name, email, password } = req.body;

      const token = jwt.sign({ name, email, password }, keys.secretOrKey, {
        expiresIn: "10m",
      });

      const emailData = {
        from: "bhanurasadcherukuvada <mailgun@bhanuprasadcherukuvada.me>",
        to: email,
        subject: "Account activation link",
        html: `
        <h1>Please use the following link to activate your account</h1>
            <p>${keys.CLIENT_URL}/auth/activate/${token}</p>
                <hr />
                <p>This email may contain sensetive information</p>
                <p>${keys.CLIENT_URL}</p>
  `,
      };

      mg.messages().send(emailData, function (error, body) {
        console.log(body);
        if(error){
         return res.status(400).json({error: "We had some issue sending the email. Please try after some time"});
        }
        return  res.json({'message':`Email has been sent to ${email}. Follow the instruction to activate your account`})
      }); 
    }
  });
};


exports.accountActivation = (req,res)=>{
  const { token } = req.body;

  if(token){
    jwt.verify(token,keys.secretOrKey,(err,decoded)=>{
      if(err){
        return res.status(401).json({
          error: "Expired Link. Signup Again"
        })
      }
      else{
        const { name,email,password} = jwt.decode(token);
        
         const gravatar1 = gravatar.url(req.body.email, {
           s: "200",
           r: "pg",
           d: "identicon",
         });

         const newUser = new User({
           name: name,
           email: email,
           avatar: gravatar1,
           password: password,
         });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;

              newUser.password = hash;
              newUser
                .save()
                .then((err,user) =>{ 
                  
                  return  res.json({
                    message: "Signup Success . Please Login"
                  })})
                .catch((err) => {
                  return res.status(400).json({
                    message: "Something went wrong. Please Try again after some time"
                  })
                });
            });
          });
      }
    })
  }
}


exports.login = (req, res,) => {
  console.log("login method");
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    //isMatch is true/false value if both are equal true else false
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name, avatar: user.avatar,role:user.role};
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              sucess: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        errors.password = "password incorrect";
        res.status(400).json(errors);
      }
    }).catch(err=>console.log(err));
  });
};

exports.current = (req, res, next) => {
  // user object is made available in request now
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
  });
};

exports.forgotPassword = (req,res)=>{
  const { email } = req.body;

  User.findOne({email},(err,user)=>{
    if(err || !user){
      return res.status(400).json({
        error: "User with that email doesn't exist"
      })
    }

    const token = jwt.sign({id:user.id,name : user.name},keys.secretOrKey,{expiresIn:'10m'});

     const emailData = {
       from: "bhanurasadcherukuvada <mailgun@bhanuprasadcherukuvada.me>",
       to: email,
       subject: "Password reset  link",
       html: `
        <h1>Please use the following link to reset the password of your account</h1>
            <p>${keys.CLIENT_URL}/auth/password/reset/${token}</p>
                <hr />
                <p>This email may contain sensetive information</p>
                <p>${keys.CLIENT_URL}</p>
  `,
     };


     user.updateOne({resetPasswordLink:token},(err,success)=>{
       if(err){
         return res.status(400).json({
           error: "there is some issue. Please try after some time"
         })
       }
       else{

        mg.messages().send(emailData, function (error, body) {
          console.log(body);
          if (error) {
            return res
              .status(400)
              .json({
                error:
                  "We had some issue sending the email. Please try after some time",
              });
          }
          return res.json({
            message: `Email has been sent to ${email}. Follow the instruction to reset the password of  your account`,
          });
        }); 

       }
     })
  })
}



exports.resetPassword = (req,res)=>{
  const { resetPasswordLink, newPassword} = req.body;

  if(resetPasswordLink){
    jwt.verify(resetPasswordLink,keys.secretOrKey,(err,decoded)=>{
      if(err){
        return res.status(400).json({
          error: "Expired Link. Try again"
        });
      }

      User.findOne({resetPasswordLink},(err,user)=>{
        if (err || !user) {
          return res.status(400).json({
            error: "Something went wrong. Try Later",
          });
        }

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newPassword, salt, (err, hash) => {
              if (err){
                console.log("error while generating hash for new password");
                return res.status(400).json({error: "error reseting the password. Please try again"});
              }
              
              user.updateOne({password:hash,resetPasswordLink:''},(err,result)=>{

                if (err) {
                  console.log("error while saving new password to db");
                  return res.status(400).json({
                    error: "error reseting the password. Please try again",
                  });
                }
                return res.json({
                  message:
                    "Reset Successful. Please Login with new credentials",
                });

              });
                
            });
          });
      })

    })
  }
}

/* 
const client = new OAuth2Client(keys.GOOGLE_CLIENT_ID);

exports.googleLogin = (req,res)=>{
  const {idToken} = req.body;

  client.verifyIdToken({idToken,audience:keys.GOOGLE_CLIENT_ID})
    .then(res=>{
      const {email_verified,name,mail} = res.payload;
      if(email_verified){
        User.findOne({email}).exec((err,user)=>{
          if(user){

            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar,
            };
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  sucess: true,
                  token: "Bearer " + token,
                });
              }
            );
          }
          else{
            let password = email+ keys.secretOrKey;
            //TODO create user 

             const gravatar1 = gravatar.url(req.body.email, {
               s: "200",
               r: "pg",
               d: "identicon",
             });

             const newUser = new User({
               name: name,
               email: email,
               avatar: gravatar1,
               password: password,
             });

             bcrypt.genSalt(10, (err, salt) => {
               bcrypt.hash(newUser.password, salt, (err, hash) => {
                 if (err) throw err;

                 newUser.password = hash;
                 newUser
                   .save()
                   .then((err, user) => {
                     return res.json({
                       message: "Signup Success . Please Login",
                     });
                   })
                   .catch((err) => {
                     return res.status(400).json({
                       message:
                         "Something went wrong. Please Try again after some time",
                     });
                   });
               });
             });
           }
        })
      }
    })
}
 */

