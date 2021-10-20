require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');


global.__basedir = __dirname;


const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const contest = require('./routes/api/contest');
const github = require('./routes/api/githubRoute');
const admin = require('./routes/api/adminRoute');
const codingStats = require('./routes/api/codingStatsRoute');


const bodyParser = require('body-parser');
const passport = require('passport');

const path = require('path');
const responseTime = require('response-time');

const fs = require("fs");

const app = express();


const dirPath = path.join(__dirname, "public/pdfs");

const files = fs.readdirSync(dirPath).map((name) => {
  return {
    name: path.basename(name, ".pdf"),
    url: `/pdfs/${name}`,
  };
});



app.use(bodyParser.json());
app.use(responseTime());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders:["*"],
    exposedHeaders:["*"],
    credentials:true,

  })
);

app.use(bodyParser.urlencoded({extended:true}));
app.use(passport.initialize());



// passport config

require('./config/passport')(passport);
const db = require('./config/keys_prod').monogURI;


mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex:true,
  })
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));




/// Use routes

app.get("/pdfview", (req, res) => {
  console.log(files);
  res.json({ files });
});


// app.use("/uploads", express.static("uploads"));

app.use("/api/users",users);
app.use("/api/profile",profile);
app.use("/api/posts",posts);
app.use('/api/contest',contest);
app.use('/api/github',github);
app.use('/api/codingstats',codingStats);
app.use("/api/admin", passport.authenticate("jwt", { session: false }), admin);
app.use(
  "/uploads",
  (req,res,next)=>{
    passport.authenticate("jwt", { session: false });
    next();
  },
  express.static(path.join(__dirname, "uploads"))
);
app.use(
  "/public",
  passport.authenticate("jwt", { session: false }),
  express.static(path.join(__dirname, "public"))
);


if(process.env.NODE_ENV == 'production'){
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  });

}


//# Test url 

const port  = process.env.PORT || 5000;
app.listen(port,()=>console.log(`server running at ${port}`));