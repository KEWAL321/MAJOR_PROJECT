const Listings = require("../models/listing.js")
const Review = require("../models/review.js")

module.exports.renderCreateNew = async (req, res) => {//validateReview checks if all the values of fields from "FROM" exists , hence it validates the data from form
    let { id } = req.params;// and validateReview is middle here,the wrapAsync handles the basics errors
    let listing = await Listings.findById(id);
    let newReview = new Review(req.body.review);// it means new review is to be addes in the collection "reviews";
    newReview.author = req.user._id;
    console.log(newReview);
    listing.reviews.push(newReview); // it means the recent review's id is to be pushed in the collection "listing";

    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created!");
    res.redirect(`http://localhost:3000/listings/${id}`);
}

module.exports.renderDelete = async (req, res) => {// validation for review is not required since it has already been validate while inserting in db
    let { id, reviewId } = req.params;
    await Listings.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);//here "Review" is model name   
    req.flash("success", "Review Deleted");
    res.redirect(`http://localhost:3000/listings/${id}`);
}