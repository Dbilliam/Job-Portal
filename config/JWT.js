const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')
const User = require('../models/user')
const db = require("../models");

const loginrequired = async (req, res, next)=>{
    const token = req.cookies['access-token']
    if(token){
        const validatetoken = await jwt.verify(token, process.env.JWT_KEY)
        if(validatetoken){
            res.user = validatetoken.id 
            next()
        }else{
            console.log('token expires')
            res.redirect('/login')
        }
    }
    else{
            console.log('token not found')
            res.redirect('/login')
        }
}


const verifyEmail = async(req, res, next)=>{
    try {
        const user = await db.User.findOne({ where : {email : req.body.email }})
        if(user.isVerified){
            next()
        }else{
            console.log("Please check your email to verify your account")
            } 
        } catch (err) {
        console.log(err)

        
    }
    
}

module.exports = { loginrequired, verifyEmail }