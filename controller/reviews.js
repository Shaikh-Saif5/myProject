const Listing = require("../models/listing");
const Review = require("../models/review");


module.exports.createReview = async(req,res)=>{
    // console.log(req.params.id);
    
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author= req.user._id;
    console.log(newReview);
    

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","New Review Created!")
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async(req,res)=>{
    let {id,reviewId} = req.params;       
    await Listing.findByIdAndUpdate(id, { $pull : { reviews : reviewId } } ); //  $pull operator : in MongoDB it is used to remove an element or elements from an array field. It's often used in conjunction with the update() method to modify existing documents in a collection.
    await Review.findByIdAndDelete(reviewId);  
    req.flash("success","Review Deleted!")  
    res.redirect(`/listings/${id}`);
};