const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');

//Route:1 create a user
router.post('/CreateUser',[
    body('Name','Enter a valid name').isLength({min : 3}),
    body('Email','Enter a valid email').isEmail(),
    body('Pasword','Pasword must have 5 or more characters').isLength({min : 5}),
],async (req,res)=>{
    //return errors if found
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check if Email exist
    let user = User.findOne({Email : req.body.Email}).then(user=>{
        if(user!==null){
            return res.status(400).json({error : 'Email already exist'})
        }
        else{
            User.create({
                Name : req.body.Name,
                Email : req.body.Email,
                Pasword : req.body.Pasword
            })
            return res.json({Message : 'User Created'})
        }
    });
})

//Route:2 auth a user
router.post('/Login',[
    body('Email','Enter a valid email').isEmail(),
    body('Pasword','Pasword cannot be blank').exists()
],async (req,res)=>{
    //return errors if found
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,Pasword}=req.body
    try {
        let user= await User.findOne({Email : req.body.Email})
        if(!user){
            return res.status(400).json({error : 'Enter correct Login Credintials'})
        }
        if(Pasword!=user.Pasword){
            return res.status(400).json({error : 'Enter correct Login Credintials'})
        }
        const Data={
            user:{
                Name:user.Name,
                Roll:user.Role
            }
        }
        return res.json(Data)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error : 'server error'})
    }
})


//Route:3 get all emails
router.post('/GetAllEmails',[
],async (req,res)=>{
    //return errors if found
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    let user=User.find().then(user=>{
        let Emails=[]
        for (let i=0;i<user.length;i++){
            Emails[i]=user[i].Email
        }
        return res.json(Emails)
    })
})

module.exports=router