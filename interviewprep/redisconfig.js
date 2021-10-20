const redis = require("redis");
const keys = require('./config/keys')
const client = redis.createClient(redis_url = keys.redis_url);

console.log(" redis connected");

 module.exports = client;