const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const wrapAsync = require("./view/utils/wrapAsync.js");//
const ExpressError = require("./view/utils/ExpressError.js")
const { listingSchema } = require("./schema.js");
const { reviewSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;

        // If the user tries to post a review (POST request path), redirect them to the listing page 
        // after login instead of the API endpoint.
        if (req.originalUrl.includes("/reviews")) {
            const listingId = req.originalUrl.split("/")[2]; // assuming /listings/:id/reviews
            if (listingId) {
                req.session.redirectUrl = `/listings/${listingId}`;
            }
        }

        req.flash("error", "you must be logged in to create listing!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};


module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner._id.equals(res.locals.currentUser._id)) {
        req.flash("error", "you are not the owner of this listing");
        return res.redirect(`/listings/${listing._id}`);
    }
    next();
};


module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);

    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");

        throw new ExpressError(400, errMsg);
    }
    else {
        next();
    }
}


module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);

    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");

        throw new ExpressError(400, errMsg);
    }
    else {
        next();
    }
}


module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author._id.equals(res.locals.currentUser._id)) {
        req.flash("error", "you are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
};
