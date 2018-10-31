//dependencies
//node.js framework
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// ******************
//bodyParser extracts the entire body portion of an incoming request stream and exposes it on req.body.  This is middleware that no longer is part of Express.js.  Parses the JSON, buffer, string, and URL encoded data submitted using HTTP POST request.
// var bodyParser = require("body-parser")
// ******************
var PORT = process.env.PORT || 3030
var db = require("./models");

var exphbs = require('express-handlebars')
// ******************
//node.js module for mongodb
// var mongojs = require("mongojs")
//JavaScript library used to make HTTP requests from node.js or XMLHttpRequests from the browser. 
var axios = require('axios')
//Cheerio to implement the core of jQuery for the server.
var cheerio = require('cheerio')

//initialze express
var app = express()

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB

var databaseUri = "mongodb://localhost/scrape";
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
  });
} else {
  mongoose.connect(databaseUri, {
    useNewUrlParser: true
  })
}

//handlebars
app.engine("handlebars",
  exphbs({
    defaultLayout: 'main'
  })
)
app.set("view engine", "handlebars")

app.get("/", function (req, res) {
  console.log("test36")
  // First, we grab the body of the html with axios
  axios.get("http://www.stereogum.com/").then(function (response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);
    console.log("test40")
    // Now, we grab every h2 within an article tag, and do the following:
    $("div.post.row").each(function (i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.link = $(this).find("a").attr("href")
      result.title = $(this).find("div.preview-holder>a>h2").text()
      // var title = $(this).find("div.preview-holder>a>h2").text()
      // var arrTitle = title.split("");
      // var arrTitle2 = arrTitle.splice(0,2);
      // arrTitle = arrTitle2.splice(arrTitle2.length-2, arrTitle2.length-1);
      // result.title = arrTitle.toString();
      result.preview = $(this).find("div.preview-holder>.preview").text()
      result.author = $(this).find("div.preview-holder>.author").text()
      result.image = $(this).find("div.image-holder>a>.mainembed>.img-wrap>img").attr("src")
      console.log(result)

      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function (dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function (err) {
          // If an error occurred, send it to the client
          // return res.json(err);
        });
    });
  })
  db.Article.find({}, function (error, data) {
    if (error) { throw error }
    else {
      var hbsObject = {
        entries: data
      }
      res.render("index", hbsObject)
    }
  })
  // If we were able to successfully scrape and save an Article, send a message to the client
  // });
});

//Listen on port 3030
app.listen(PORT, function () {
  console.log("App running on port 3030")
})