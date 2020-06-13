var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const campground = require("../Yelpcamp/models/campground");

app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost/interview_experience_project",{useNewUrlParser: true, useUnifiedTopology: true  });

var postSchema = new mongoose.Schema({
    description: String
});

var Posts = mongoose.model("posts",postSchema);



app.get("/posts",function(req,res){
    // render through database
    Posts.find({},function(err,postsFromDB){
        if(err){
            console.log(err);
            res.send("ERROR!");
        }
        else {
            var  postObject = {
                posts : postsFromDB
            };
            res.json(postObject);
            console.log(postsFromDB)
        }
    });
});

app.post("/posts",function(req,res){
    // add to database
    var postDescription = req.body.post;
    var postObject = {
        description: postDescription
    }
    Posts.create(postObject,function(err,post){
        if(err){
            console.log(err);
        } else {
            res.send("Post created successfully");
        }
    })
});

app.listen("4000",function(){
    console.log("server running on port 4000");
})