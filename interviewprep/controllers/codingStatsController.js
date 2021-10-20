const axios = require("axios");
const { response } = require("express");
const client = require("../redisconfig");
const keys = require("../config/keys");
const Profile = require("../models/Profile");


exports.codeChefApi = async (req, res) => {
  let profile;
  const errors = {};
  const platform = "codechef";
  let result = { data: {} };
  let username = "";
  
  try {
    profile = await Profile.findOne({ user: req.user });
    if (!profile) {
      errors.profile = "There is no profile for this user";
      return res.status(404).json(errors);
    }

    console.log(profile.coding);

    if (profile.coding.codechef !== null) {
      username = profile.coding.codechef;
      console.log(username);
     client.get(`${platform}-${username}`,async (err,data)=>{
        console.log("entering code block");
        if(err) console.log(err);
        if(data){
          console.log(data);
          console.log("returning cached data");
          result.data = JSON.parse(data);
          return res.json(result);
        }
        else{
          try {
            let url = `${keys.CRAWLER}/api/${platform}/${username}`;
            const data = await axios.get(url).then((res) => res.data);
            result.data = { ...data };
            client.setex(`${platform}-${username}`,3600,JSON.stringify(result.data),(err,success)=>{
              console.log(`${platform}-${username}`);
              if(success){console.log("coding data cached");}
            })
            console.log(result.data);
            return res.json(result);
          } catch (e) {
            errors.codechef = "error fetching the codechef details of user";
            return res.status(400).json(errors);
          }
        }
      });

    } else {
      errors.codechef = "you didn't set your codechef username";
      return res.status(400).json(errors);
    }
  } catch (e) {
    errors.codechef = "error fetching the details of the user";
    return res.status(500).json(errors);
  }
};

exports.leetcodeApi = async (req, res) => {
  let profile;
  const errors = {};
  const platform = "leetcode";
  let result = { data: {} };
  let username = "";

  try {
    profile = await Profile.findOne({ user: req.user });

    if (!profile) {
      errors.profile = "There is no profile for this user";
      return res.status(404).json(errors);
    }

    if (profile.coding.leetcode !== null) {
      username = profile.coding.leetcode;
      client.get(`${platform}-${username}`,async (err,data)=>{
        
        if(err) console.log(err);
        if(data){
          console.log('returning cached data');
          result.data = JSON.parse(data);
          return res.json(result);
        }
        else{
          try {
             let url = `${keys.CRAWLER}/api/${platform}/${username}`;
            console.log(url);
            const data = await axios.get(url).then((res) => res.data);
            result.data = { ...data };
            client.setex(`${platform}-${username}`,3600,JSON.stringify(result.data),(err,success)=>{
              if(success){console.log("coding data cached");}
            })
            console.log(data);
            res.json(result);
          } catch (e) {
            console.log(e);
            errors.leetcode = "error fetching the leetcode details of user";
            return res.status(400).json(errors);
          }
        }
      });
    } else {
      errors.leetcode = "you didn't set your leetcode username";
      return res.status(400).json(errors);
    }
  } catch (e) {
    console.log(e);
    errors.leetcode = "error fetching the details of the user";
    return res.status(500).json(errors);
  }
};
