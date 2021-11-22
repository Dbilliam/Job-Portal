/* eslint-disable indent */
/* eslint-disable no-unused-vars */
// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const { loginrequired } = require('../config/JWT');
const { verifyEmail } = require('../config/JWT');



// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");


module.exports = function(app) {
  // Load login page when application starts
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.render("searchjob");
    }
    res.render("index");
  });
  app.get("/login", (req, res) => {
    // If the user already has an account send them to the login page
    if (req.user) {
      res.render("signup");
    }
    res.render("login");
  });

  // Render sign up page
  app.get("/signup", (req, res) => {
    // If the user already has an account send them to the login page
    if (req.user) {
      res.render("index");
    }
    res.render("signup");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page

  app.get("/searchjob", (req, res) => {
    res.render("searchjob");
  });
  
  app.get("/privacy", (req, res) => {
    res.render("privacy");
  });
  app.get("/about-us", (req, res) => {
    res.render("about-us");
  });
  app.get("/terms-conditions", (req, res) => {
    res.render("terms-conditions");
  });
  app.get("/disclaimer", (req, res) => {
    res.render("disclaimer");
  });
  app.get("/success", (req, res) => {
    res.render("success");
  });

  app.get("/packages",(req, res)=>{
    res.render("packages");
  })

  // Render Post job page
  app.get("/postjob", (req, res) => {
    res.render("postjob");
  });


  app.get("/user", loginrequired, (req, res) => {
    res.render("user");
  });
  
  
  
};
