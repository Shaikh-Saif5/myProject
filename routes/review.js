const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
// const ExpressError = require("../utils/expressError.js");
const Listing = require("../models/listing.js");
const {validateReviews, isLoggedIn,isAuthor} = require("../middleware.js");

const reviewController = require("../controller/reviews.js")




//Reviews
//POST Review Route

router.post(
    "/" ,
    isLoggedIn,
    validateReviews,
    wrapAsync(reviewController.createReview ));

//Delete Review Route
router.delete(
    "/:reviewId",
    isLoggedIn, 
    isAuthor,
    wrapAsync(reviewController.destroyReview),
);

module.exports = router;