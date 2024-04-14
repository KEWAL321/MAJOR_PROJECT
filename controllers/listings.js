const Listings = require("../models/listing.js");

module.exports.index = async (req, res, next) => {
  const allListings = await Listings.find({});
  res.render("index.ejs", { allListings });
};

module.exports.renderShow = async (req, res, next) => {
  let { id } = req.params;
  const list = await Listings.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner"); //collection
  if (!list) {
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("http://localhost:3000/listings/");
  }
  res.render("show.ejs", { list });
  // console.log(list);
};

module.exports.renderCreateNew = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;

  const newListing = new Listings(req.body.listing); // .listing returns object with all key value pairs of names and values
  newListing.image = { url, filename }; // create object for newlisting.image i.e newlisting{image:{url:..,filename:...}}
  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("http://localhost:3000/listings/");
};

module.exports.renderUpdate = async (req, res, next) => {
  try {
    let { id } = req.params; //cuz req.params returns an object
    let listing = await Listings.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file != "undefined ") {
      // if file doesnot exist it show undefined
      let url = req.file.path;
      let filename = req.file.filename;
      listing.image = { url, filename };
      await listing.save();
    }

    req.flash("success", "Listing Updated!");
    res.redirect(`http://localhost:3000/listings/${id}`);
  } catch (err) {
    next(err);
  }
};

module.exports.renderEdit = async (req, res, next) => {
  let { id } = req.params; //cuz req.params returns an object
  const listing = await Listings.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("http://localhost:3000/listings/");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("edit.ejs", { listing, originalImageUrl });
};

module.exports.renderDelete = async (req, res, next) => {
  let { id } = req.params;
  await Listings.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted");
  res.redirect("http://localhost:3000/listings/");
};
