const mongoose = require('mongoose');
const sanitize = require('sanitize-html');

const Post = require('../models/Post');
const Profile = require('../models/Profile');
const Media = require('../models/Media');

const multer = require('multer');

//multer storage
let storage = multer.diskStorage({
  destination : (req,file,cb) =>{
    cb(null,"uploads/");
  },
  filename:(req,file,cb) =>{
    const dashedFileName = file.originalname.trim().toLowerCase().split(" ").join("_");
    cb(null,`${Date.now()}_${req.user.id}-${dashedFileName}`);
  },
  fileFilter:(req,file,cb)=>{
    const ext = path.extname(file.originalname);
    if(ext !=='.jpg' && ext !=='.png' && ext !=='.mp4'){
      return cb(res.status(400).json({upload:"only jpg png mp4 are allowed"}));
    }
    cb(null,true);
  }
})

const upload = multer({storage:storage}).single("file");

exports.uploadfiles =  (req,res,next)=>{
   upload(req,res, async (err)=>{
    if(err){
      return res.status(400).json({success:false,err});
    }
    const url = req.protocol + "://" + req.get("host")+"/";
    const newFile = new Media({
      user: req.user.id,
      url: url + res.req.file.path.replace(/\\/g, "/"),
    });

    await newFile.save();
     return res.json({success:true,url: res.req.file.path,fileName:res.req.file.fileName})
  });
}

const validatePostInput = require('../validators/postValidation');

exports.test = (req, res, next) => {
  res.status(200).json({ message:"test controller works" });
};


exports.postApost = (req,res,next)=>{

  const {errors,isValid} = validatePostInput(req.body);
  if(!isValid) {
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    text: req.body.text,
    name:req.body.name,
    avatar:req.body.avatar,
    user:req.user.id
  })

  newPost.save().then(post=> res.json(post));
}



exports.getPosts = (req,res)=>{
  Post.find().sort({date:-1}).then(posts=>res.json(posts)).catch(err=>res.status(404).json({nopostsfound:'no posts to show'}));
}


exports.getPostsById = (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) => res.status(404).json({nopostfound:"no post found with that id"}));
};

exports.deletePostById = (req,res)=>{
  Profile.findOne({user:req.user.id})
  .then(profile=>{
    Post.findById(req.params.id)
    .then(post=>{
      if(post.user.toString() !== req.user.id){
        return res.status(401).json({notauthorized:"user not authorized"});
      }

      post.remove().then(()=> res.json({success:true}));
    })
    .catch(err=>res.status(404).json({postnotfound:'no posts found'}));
  })
}

exports.likePost = (req,res)=>{
  Profile.findOne({user:req.user.id}).then(profile=>{
    Post.findById(req.params.id)
    .then(post=>{
      if(post.likes.filter(like =>like.user.toString() === req.user.id).length >0){
        return res.status(400).json({alreadyliked:'user already liked the post'});
      }

      post.likes.unshift({user:req.user.id});
      post.save().then(post=>res.json(post));
    })
    .catch(err=>res.status(404).json({postnotfound:"No post found"}));
  })
}

exports.unlikePost = (req, res) => {
  Profile.findOne({ user: req.user.id }).then((profile) => {
    Post.findById(req.params.id)
      .then((post) => {
        if (
          post.likes.filter((like) => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ notliked: "user not yet liked the post" });
        }

        const removeIndex = post.likes
          .map(item => item.user.toString()).indexOf(req.user.id);
          post.likes.splice(removeIndex,1);

        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(404).json({ postnotfound: "No post found" }));
  });
};


exports.comment = (req,res)=>{
   const { errors, isValid } = validatePostInput(req.body);
   if (!isValid) {
     return res.status(400).json(errors);
   }


  Post.findById(req.params.id).then(post=>{
    const newComment = {
      text:req.body.text,
      name:req.body.name,
      avatar:req.body.avatar,
      user:req.user.id
    }

    post.comments.unshift(newComment);
    post.save().then(post=>res.json(post));
  })
  .catch(err=>res.status(404).json({postnotfound:'No post found'}));
}


exports.deletecomment = (req, res) => {
  
  Post.findById(req.params.id)
    .then((post) => {
      if(post.comments.filter(comment=>comment._id.toString() === req.params.comments_id).length === 0){
        return res.status(404).json({commentnotexists:'comment does not exist'});
      }
      const removeIndex = post.comments.map(item=>item._id.toString()).indexOf(req.params.comments_id);
      post.comments.splice(removeIndex,1);
      post.save().then((post) => res.json(post));
    })
    .catch((err) => res.status(404).json(err));
};