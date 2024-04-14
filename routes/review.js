const express = require("express");
const router = express.Router({ mergeParams: true });
const Listings = require("../models/listing.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isReviewAuthor, validateReview, isLoggedIn } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js")

// post review route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.renderCreateNew));

// Delete Review route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.renderDelete));

module.exports = router;