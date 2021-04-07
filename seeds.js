var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment= require("./models/comment");
var data = [
	
	{
		name : "Cloud's Rest",
		image: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Wilderness_Adventure_Camps.jpg",
		description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer"
	},
	
	
	{
		name : "Desert Side",
		image: "https://r1imghtlak.mmtcdn.com/ae43756620c611eab3380242ac110005.jpg?&output-quality=75&output-format=jpg",
		description : "Beautiful"
	},
	
	{
		name : "Another One",
		image: "https://res.cloudinary.com/simplotel/image/upload/x_3,y_90,w_2427,h_1367,r_0,c_crop,q_60,fl_progressive/w_960,f_auto,c_fit/youreka/Camp-Tirthan-Youreka.in_hxeozs",
		description : "Beautiful"
	}
	
]


function seedDB(){
	
	//Removed All campgrounds
	Campground.remove({},function(err){
		
		if(err)
			{
				console.log(err);
			}
		console.log("EVERYTHING JUST REMOVED MAN");
		
		// add a few campgrounds
	data.forEach(function(seed){
		Campground.create(seed,function(err,campground){
			
			if(err){
				console.log(err);
			}
			else{
				console.log("added a campground");
				
				//create a comment
				Comment.create(
                { 
				  text: "This is good place , but i wished there would be internet",
					author :"James Bond"
				},function(err,comment){
					if(err)
						{
							console.log(err);
						}
					else{
						campground.comments.push(comment);
						campground.save();
						console.log("created new comment");
					}
				})
			}
		});
	});
	
	
	});
	
	
}

module.exports = seedDB;