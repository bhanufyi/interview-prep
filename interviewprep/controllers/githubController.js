const axios = require("axios");
const client = require("../redisconfig");
const keys = require("../config/keys");

const Profile = require('../models/Profile');




exports.githubProfile = (req,res)=>{

    const count = 5;
    const sort = "created: asc";
    const url = `https://api.github.com/users/${req.params.username}/repos?per_page=${count}&sort=${sort}&client_id=${keys.GITHUB_CLIENT_ID}&client_secret=${keys.GITHUB_CLIENT_SECRET}`;
    Profile.findOne({user:req.user.id}).then((profile)=>{
        
        const {githubusername} = profile;
        if(githubusername === req.params.username){
            client.get(req.user.id +"-"+"githubInfo",(err,result)=>{
                if(result){
                    res.json(JSON.parse(result));
                }
                else{
                    axios.get(url)
                        .then(res=>{
                            client.setex(req.user.id +'-'+"githubInfo",1800,JSON.stringify(res.data));
                            return res.json(res.data);
                        })
                        .catch(err=> res.status(400).json({error: "error while fetching the repos"}));
                }
            })
        }
    })
   
}