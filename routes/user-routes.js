// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const { JsonWebTokenError } = require("jsonwebtoken");
const crypto = require('crypto')
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const dotenv = require("dotenv").config();
const { verifyEmail } = require('../config/JWT');






module.exports = function(app) {
  

  const createToken = (id) => {
    return jwt.sign({ id }, JWT_KEY = process.env.JWT_KEY)
  }
  

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
      user: 'assamjobfind@gmail.com',
      pass: process.env.password
    },
    tls:{
      rejectUnauthorized: false
    }
  })
  app.post("/api/signup", (req, res) => {
    db.User.findOne({
      where: {
        email: req.body.email
      }
    }).then(dbUser =>  {
      // If user with email id already exists
      if (dbUser) {
        res.status(400).json("This email has already been taken.");
        return;
      }
      if (!dbUser) {
        // Insert user data into User model
        db.User.create({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: req.body.password,
          emailToken: crypto.randomBytes(64).toString('hex'),
          isVerified: false
        })
          .then((dbUser) => {
            let mailOptions = {
              from: ' "Verify Your Email" <assamjobfind@gmail.com>',
              to: `${req.body.email}`,
              subject: 'Assam Job Finder - verfiy your email',
              html: ` <h2> ${req.body.firstname}! Thanks For Registartion On Our Site</h2>
              <h4>Please Verify your mail to continue......</h4>
              <a href="http://${req.headers.host}/verify-email?token=${dbUser.emailToken}">Verfiy Your Email</a>`
            }
            transporter.sendMail(mailOptions, function(error, info){
              if(error){
                console.log(error)
              }else{
                console.log('Verfication email is sent to your gmail acoount')
              }
            })
            res.status(400).json('Thanks for registration. Please check spam you email to verify your account.')
          }) 
          .catch(err => {
            res.status(401).json(err);
          });
        }
      });
    });


  



      

  
  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  
  app.post("/api/login", verifyEmail, async(req, res)=> {
    try {
      const{ email, password } = req.body
      const findUser = await db.User.findOne({ where : {email}})
      if (findUser) {
        const match = await bcrypt.compare(password, findUser.password)
        if (match) {
          const token = createToken(findUser.id)
          console.log(token)
          res.cookie('access-token', token)
          res.redirect('/user')
        }
        else {
          console.log('invalid Password')
        }
      } else {
        console.log('user not registered')
  }
    }
    catch (err) {
      console.log(err)
    }
  })


  app.get('/verify-email', async (req, res) => {
      try {
        const token = req.query.token
        const user = await db.User.findOne({  where :  {emailToken: token} })
        if (User){
          user.isVerified = true;
          user.emailToken = null;
          
          await user.save()
          res.redirect('/login')
        }
        else {
          res.redirect('/signup')
          console.log("email is not verified")
        }
      }
      catch (err) {
        console.log(err)
      }
  })

  
  


  // Route for logging user out
  app.get("/logout", (req, res) => {
    res.cookie('access-token', " ", {maxage: 1})
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};
