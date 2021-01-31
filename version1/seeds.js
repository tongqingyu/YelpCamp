var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");


var data=[
    {
        name:"Great View",
        image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350",
        description:"Unreal"
    },
    {
        name:"Amazing star sky",
        image:"https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350",
        description:"Amazing Place"
    },
    {
        name:"Wood House",
        image:"https://images.pexels.com/photos/1230302/pexels-photo-1230302.jpeg?auto=compress&cs=tinysrgb&h=350",
        description:"Silent Place"
    }
]

// error driven coding
function seedDB(){
    // Remove all campgrounds
    // error coding
    // DeprecationWarning: collection.remove is deprecated. Use deleteOne, deleteMany, or bulkWrite instead.
    Campground.remove({},function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        // add a few campgrounds
        // seed represents one of the campground in the data 
        data.forEach(function(seed){
            // var Campground = require("./models/campground");
            // import campground model
            // This is a call-back function
            Campground.create(seed,function(err,campgrounds){
                if(err){
                    console.log(err);
                }else{
                    console.log("added a campground")
                    // add a few comments
                    Comment.create(
                        {
                            text:"This place is great",
                            author:"Home"
                        },function(err,comment){
                        if(err){
                            console.log(err);
                        }else{
                            // // once we create a comment, we associate it with a campground
                            campgrounds.comments.push(comment);
                            campgrounds.save();
                            console.log("Created New Comment");
                        }
                    });
                }
            });
        })
    });
}

// this will send the function below out
module.exports = seedDB;