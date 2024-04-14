const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listings = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index)) //Main route
  .post(
    // Add  route
    isLoggedIn,
    // validateListing,
    upload.single("listing[image].url"),
    wrapAsync(listingController.renderCreateNew)
  );

// new route
router.get("/new", isLoggedIn, (req, res) => {
  res.render("new.ejs");
});

router
  .route("/:id")
  .get(wrapAsync(listingController.renderShow)) //show route
  .put(
    //update route
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    wrapAsync(listingController.renderUpdate)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.renderDelete)); //delete route

//edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEdit)
);

module.exports = router;
