var express = require("express");
var app = express();
var bodyParser =  require("body-parser");
var mongoose = require("mongoose");
// get the model
var Campground = require("./models/campground");
var seedDB = require("./seeds");

// everytime, start seedDB at first
// seedDB store some campgrounds and comments

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp_v4");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

// Campground.create(
//     {
//         name: "Granite Hill",
//         image: "https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350",
//         description: "This is a huge one"
//     },function(err,campground){
//         if(err){
//             console.log(err);
//         }else{
//             console.log("NEWLY CREATED")
//             console.log(campground);
//         }
//     }
//     )

app.get("/",function(req,res){
    res.render("landing");
})

// req: http request
// res: http response 
app.get("/campgrounds",function(req,res){
    // get all campgrounds from DB
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    })
});

app.post("/campgrounds",function(req,res){
    res.send("YOU HIT THE POST ROUTE!")
    // gte data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name:name, image:image, description:desc};
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            //redirect back to campgrounds page
            //??
            // res.redirect("/campgrounds");
            console.log("hhh");
        }
    })
});

// New - show form to create new campground
app.get("/campgrounds/new",function(req,res){
    res.render("campgrounds/new");
});

// Show more information
app.get("/campgrounds/:id",function(req,res){
    // find the campground with provided ID
    // EindById is provided by mongo
    // Every campground in the database has a ID
    // populate and exec helps to show actual comment rather than ID
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        } else{
            console.log(foundCampground);
            res.render("campgrounds/show",{campgrounds:foundCampground});
        }
    });
});

// ==============
// COMMENTS ROUTES
// ==============

app.get("/campgrounds/:id/comments/new",function(req,res){
    Campground.findById(req.params.id,function(err,campgrounds){
        if(err){
            console.log(err);
        }else{
            // render and pass {campground:campground}
            res.render("comments/new",{campground:campgrounds});
        }
    });
    res.render("comments/new");
 });

app.listen(process.env.PORT, process.env.IP,function(){
    console.log("The YelpCamp Server Has Started!");
});