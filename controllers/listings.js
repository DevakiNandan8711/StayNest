const Listing = require("../models/listing.js");
const maptilerClient = require("@maptiler/client");
const mapToken = process.env.MAPBOX_TOKEN;
maptilerClient.config.apiKey = mapToken;


module.exports.index = async (req, res) => {
    let listings = await Listing.find({});
    res.render("listings/index", { allListings: listings });
    /* URL: http://localhost:8080/listings
        Shows: All listings page 
         Page: All listings page
         Data: All listings data */
};


module.exports.renderNewForm = (req, res) => {
    res.render("listings/new");
    /* URL: http://localhost:8080/listings/new
       Shows: New listing page
        Page: New listing page */
};


module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested does not exist");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show", { listing });
    /* URL: http://localhost:8080/listings/:id
       Shows: Listing details page
        Page: Listing details page
        Data: Listing details data */
}



module.exports.createListing = async (req, res, next) => {
    let response = await maptilerClient.geocoding.forward(req.body.listing.location, { limit: 1 });


    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };

    // MapTiler client returns a FeatureCollection directly, unlike Mapbox which returned {body: FeatureCollection}
    newListing.geometry = response.features.length ? response.features[0].geometry : { type: 'Point', coordinates: [0, 0] };

    let savedListing = await newListing.save();
    console.log(savedListing);
    console.log("Listing saved, setting flash message");
    req.flash("success", "New listing created");
    res.redirect("/listings");

}


module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested does not exist");
        res.redirect("/listings");
    }
    let orginalImageurl = listing.image.url;
    orginalImageurl = orginalImageurl.replace("/upload", "/upload/w_250");
    res.render("listings/edit", { listing, orginalImageurl });
};


module.exports.updateListing = async (req, res) => {

    if (!req.body.listing) {
        throw new ExpressError(404, "send valid data for listing");

    }
    let { id } = req.params;
    const listing = await Listing.findById(id);
    const oldLocation = listing.location;

    // Update basic fields
    Object.assign(listing, req.body.listing);

    // If location changed, recompute geometry
    if (req.body.listing.location && req.body.listing.location !== oldLocation) {
        const response = await maptilerClient.geocoding.forward(req.body.listing.location, { limit: 1 });
        listing.geometry = response.features.length
            ? response.features[0].geometry
            : { type: "Point", coordinates: [0, 0] };
    }

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
    }
    await listing.save();
    req.flash("success", "Listing updated");
    res.redirect(`/listings/${id}`);
}



module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedlisting = await Listing.findByIdAndDelete(id);
    console.log(deletedlisting);
    req.flash("success", "Listing deleted");
    res.redirect("/listings");
} 
