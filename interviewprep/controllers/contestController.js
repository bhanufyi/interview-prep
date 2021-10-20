const axios = require('axios');
const { response } = require('express');
const client = require('../redisconfig');
exports.getContests = (req,res)=>{

    let contestData;
    
    client.get("codingContestsData",(err,data)=>{
      if(err) console.log(err);
      if(data){
        console.log("returning cached data");
        return res.json(JSON.parse(data));
      }
      else{

        axios
          .get("https://clist.by:443/api/v1/contest/", {
            headers: {
              Authorization:
                "ApiKey codecutlet:fe5ca5da6dc0fb4b1513f231bb0489bc8d8878eb",
            },
            params: {
              start__lte: new Date().toISOString().slice(0, -5),
              end__gt: new Date().toISOString().slice(0, -5),
            },
          })
          .then((response) => {
            client.setex("codingContestsData",3600,JSON.stringify(response.data),(err,success)=>{
              if(success){console.log("coding data cached");}
            })
            res.json(response.data);});

      }
    });
}


exports.stopStalkApi = (req,res)=>{
  let contestData;
  const url = "https://contesttrackerapi.herokuapp.com/";
  
  client.get("stopstalkContests",(err,data)=>{
    if(err) console.log(err);
    if(data){
      return res.json(JSON.parse(data));
    }

    axios.get(url)
      .then(response=> {
        client.setex("stopstalkContests",3600,JSON.stringify(response.data.result),(err,success)=>{
          if(success){console.log("data cached");}
          res.json(response.data.result);
        })
      })
  })

}