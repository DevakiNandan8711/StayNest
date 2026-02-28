if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
};


const express = require("express");
const router = express.Router();
const wrapAsync = require("../view/utils/wrapAsync.js");
const ExpressError = require("../view/utils/ExpressError.js")
const { listingSchema, reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { isLoggedIn, isOwner, validateListing, validateReview } = require("../middleware.js");
const multer = require('multer')
const { storage } = require("../cloudconfig.js");
const upload = multer({ storage })

const listingController = require("../controllers/listings.js");


router
    .route("/")
    .get(wrapAsync(listingController.index))//index route
    .post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing));//create route


//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);


router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))//show route
    .put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))//update route
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));//delete route


//edit 
router.get("/:id/edit", isLoggedIn, wrapAsync(listingController.renderEditForm));



module.exports = router;

