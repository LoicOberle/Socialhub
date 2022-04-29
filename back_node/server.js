const express = require('express')
const https = require("https")
const app = express()
const dotenv = require("dotenv")
const fs = require("fs")
const path = require("path")
const bodyParser = require('body-parser');
const axios = require("axios")
const qs = require('qs')
var twig = require('twig');
const twitter = require("twitter")
const LoginWithTwitter = require('login-with-twitter')
dotenv.config({
  path: "../config.env"
})
let tokenS
const tw = new LoginWithTwitter({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackUrl: 'https://127.0.0.1:5000/twitter/callback'
})


const port = process.env.PORT
let front_path = path.join(__dirname, "..", "front")

app.use(express.static(front_path))

app.use(bodyParser.json())
app.set('views', 'views');
app.engine('html', twig.__express);

app.get('/', (req, res) => {
  res.sendFile(front_path + "/views/index.html")
})

/* TWITTER API */

app.get("/twitter/login", (req, res) => {
  tw.login((err, tokenSecret, url) => {
    if (err) {
      // Handle the error your way
      console.log(err);
    }

    // Save the OAuth token secret for use in your /twitter/callback route
    //req.session.tokenSecret = tokenSecret
    tokenS = tokenSecret
    // Redirect to the /twitter/callback route, with the OAuth responses as query params

    //res.send(url)
    res.redirect(url)
  })
})

app.get("/twitter/callback", (req, res) => {

  //res.render(front_path+"/views/redirect_twitter.html",{data:req.query.oauth_token})
  tw.callback({
    oauth_token: req.query.oauth_token,
    oauth_verifier: req.query.oauth_verifier
  }, tokenS, (err, user) => {
    if (err) {
      // Handle the error your way
    }


    // The user object contains 4 key/value pairs, which
    // you should store and use as you need, e.g. with your
    // own calls to Twitter's API, or a Twitter API module
    // like `twitter` or `twit`.
    // user = {
    //   userId,
    //   userName,
    //   userToken,
    //   userTokenSecret
    // }

    // Redirect to whatever route that can handle your new Twitter login user details!
    try {
      res.render(front_path + "/views/redirect_twitter.html", {
        data: user.userToken,
        secret: user.userTokenSecret
      })
    } catch (error) {
      res.sendFile(front_path+"/views/redirect_twitter.html")
    }
   
  });
 

})

app.get("/twitter/timeline", (req, res) => {
  console.log(req.query);
 
  var client = new twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: req.query.token,
    access_token_secret: req.query.secret
  });

  var params = {
    count: 50,
    tweet_mode:"extended"
  };
  client.get('statuses/home_timeline', params, function (error, tweets, response) {
    if (!error) {
      //console.log(tweets);
      res.status(200).send(tweets)
      //res.status(408).send({ message: "error" })
    } else {
      res.status(408).send({ message: error[0].message })
    }
  });


})

///////

/*Reddit API */

const simpleOAuth2Reddit = require('simple-oauth2-reddit');
const reddit = simpleOAuth2Reddit.create({
  clientId: process.env.REDDIT_CONSUMER_KEY,
  clientSecret: process.env.REDDIT_CONSUMER_SECRET,
  callbackURL: `https://127.0.0.1:5000/reddit/callback`,
    state: 'random-unique-string',
  scope:["identity", "edit", "flair", "history", "modconfig", "modflair", "modlog", "modposts", "modwiki", "mysubreddits", "privatemessages", "read", "report", "save", "submit", "subscribe", "vote", "wikiedit", "wikiread"]
});

const snoowrap = require('snoowrap');


app.get("/reddit/login",reddit.authorize)
app.get("/reddit/callback",reddit.accessToken,(req,res)=>{
  try {
    res.render(front_path + "/views/redirect_reddit.html", {
      data: req.token.token.access_token
    })
  } catch (error) {
    res.sendFile(front_path+"/views/redirect_reddit.html")
  }
  
})
app.get("/reddit/timeline",(req,res)=>{
let token=req.query.token
const r = new snoowrap({
  userAgent: 'Socialhub by Snau_man',
  clientId:  process.env.REDDIT_CONSUMER_KEY,
  clientSecret:  process.env.REDDIT_CONSUMER_SECRET,
  accessToken: token
});
r.getTop({"sr_detail":1}).then((response) => {
  
  res.status(200).send(response)
})

})

///

/* YOUTUBE API */
const {google} = require('googleapis');
const oauth2Client = new google.auth.OAuth2(
  process.env.YOUTUBE_CLIENT_ID,
  process.env.YOUTUBE_CLIENT_SECRET,
  "https://127.0.0.1:5000/youtube/callback"
);

// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = [
  'https://www.googleapis.com/auth/youtube',
  'https://www.googleapis.com/auth/youtube.download'
];

app.get("/youtube/login",(req,res)=>{
  const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
  
    // If you only need one scope you can pass it as a string
    scope: scopes
  });
  res.redirect(url)

})
app.get("/youtube/callback",(req,res)=>{
  oauth2Client.getToken(req.query.code).then((val)=>{
    console.log(val.tokens);
    //oauth2Client.setCredentials(val);
    try {
      res.render(front_path+"/views/redirect_youtube.html",{token:val.tokens.access_token})
    } catch (error) {
      res.sendFile(front_path+"/views/redirect_youtube.html")
    }
  
  },(reason)=>{
   // res.send("Error: "+reason)
   console.log(reason);
    res.sendFile(front_path+"/views/redirect_youtube.html")
  })

  
  
})
app.get("/youtube/timeline",(req,res)=>{
  console.log(req.query.token);
  const config = {
    headers:{
      "Authorization": "Bearer "+req.query.token
    }
  };
  const url = "https://www.googleapis.com/youtube/v3/videos?part=contentDetails,fileDetails,id,liveStreamingDetails,localizations,player,processingDetails,recordingDetails,snippet,statistics,status,suggestions,topicDetails&mine=true";
  axios.get(url, config)
  .then((response)=>{
    console.log(response.data.items);
    res.status("200").send(response.data.items)
  })
  .catch((err)=>{
    res.status(400).send(err)
  }
    
  )
})


///



https
  .createServer(
    // Provide the private and public key to the server by reading each
    // file's content with the readFileSync() method.
    {
      key: fs.readFileSync("../key.pem"),
      cert: fs.readFileSync("../cert.pem"),
    },
    app
  )
  .listen(5000, () => {
    console.log("server is runing at port 5000");
  });


/*
https://twitter.com/i/oauth2/authorize?response_type=code&client_id=OXdZbUFYSHFjcnlhQWhLZ3VacnI6MTpjaQ&redirect_uri=https://127.0.0.1:5000/twitter/callback&scope=tweet.read%20users.read%20follows.read+follows.write%20offline.access&state=state&code_challenge=test&code_challenge_method=plain

*/