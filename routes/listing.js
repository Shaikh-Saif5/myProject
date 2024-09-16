const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controller/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js")
// const upload = multer({ dest: 'uploads/' });
const upload = multer({ storage });

router
    .route("/")
    .get(wrapAsync(listingController.index))
    // .post(
    //     isLoggedIn,
    //     upload.single("listing[image]"),
    //     validateListing,
    //     wrapAsync(listingController.createListing)
    // );
    .post(upload.single("listing[image]"),(req,res)=>{
            res.send(req.file);
    });


// New Route
router.get("/new",
    isLoggedIn,
    listingController.renderNewForm
    );

router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))//show route
    .put(
        isLoggedIn,
        isOwner,
        validateListing,
        wrapAsync(listingController.updateListing)) //Upate Route
    .delete( 
            isLoggedIn,
            isOwner,
            wrapAsync(listingController.destroyListing)//Delete Route 
        );    

// Edit Route 
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
     wrapAsync(listingController.renderEditForm)
);


module.exports = router;