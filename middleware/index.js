// all the middleware goes here
var Campground = require("../models/campgrounds");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnerShip = function(req, res , next){
	
	//is user logged in ??
	    if(req.isAuthenticated()){
			
			Campground.findById(req.params.id,function(err,foundCampground){
             if(err || !foundCampground){
				 req.flash("error","Campground Not Found");
			   res.redirect("back")
		         }
		     else{
				 //does user own the campground
				 if(foundCampground.author.id.equals(req.user._id)) {
				 next();
				 }
				 else {
					 req.flash("error","You Are Not Authorised To Do That");
				  res.redirect("back");	 
					 
				 }

			    
		          }
	           });
	
			
		}else{
			req.flash("error","You need to be Logged In");
			res.redirect("back");
		}
}


middlewareObj.checkCommentOwnerShip = function(req, res, next){
	
	
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err || !foundComment){
			   req.flash("error","Comment Not Found");
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
				 req.flash("error","You Are Not Authorised To Do That");
                res.redirect("back");
            }
           }
        });
    } else {
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
	
	if(req.isAuthenticated()){
        return next();
    }
	req.flash("error","You need to Be Logged In");
    res.redirect("/login");
}


	


module.exports = middlewareObj;

