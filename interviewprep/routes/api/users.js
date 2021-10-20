const express = require("express")
const router = express.Router();
const passport = require('passport');

const usersController = require("../../controllers/usersController");

router.get('/test',(req,res)=>res.json({message:"user works!"}));
router.post('/register',usersController.register);
router.post('/login',usersController.login);
router.post('/account-activation',usersController.accountActivation);
router.post('/forgot-password',usersController.forgotPassword);
router.post('/reset-password',usersController.resetPassword);
router.get('/current',passport.authenticate('jwt',{session:false}),usersController.current);



module.exports = router;
