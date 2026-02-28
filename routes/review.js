const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../view/utils/wrapAsync.js");
const ExpressError = require("../view/utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { validateReview, isLoggedIn, isOwner, isReviewAuthor } = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");




//post review route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));





//delete Review route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));


module.exports = router;


