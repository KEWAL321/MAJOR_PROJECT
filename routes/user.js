const express = require("express");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");
const wrapAsync = require("../utils/wrapAsync.js");

router
  .route("/signup")
  .get((req, res) => {
    res.render("users/signup.ejs");
  }) //get signup form
  .post(wrapAsync(userController.renderCreateNew)); //create new user

router
  .route("/login")
  .get((req, res) => {
    res.render("users/login.ejs");
  }) //get login form
  .post(
    //login to page
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.renderLogin
  );

//logout
router.get("/logout", userController.renderLogout);

module.exports = router;
