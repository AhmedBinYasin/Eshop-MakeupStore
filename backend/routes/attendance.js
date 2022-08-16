const express = require("express");
const AttendancesSchema = require("../models/attendancesSchema")
const router = express.Router();
const { body, validationResult } = require('express-validator');

//Route:1 create Attendence
router.post('/MarkAttendence',[
    body('Email','Enter a valid email').isEmail(),
    body('Date','Enter a valid Date').exists()
],async (req,res)=>{
    //return errors if found
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check if Attendence exist
    let atten = AttendancesSchema.findOne({Email : req.body.Email,Date: req.body.Date}).then(atten=>{
        if(atten!==null){
            return res.status(400).json({error : 'Attendence already exist'})
        }
        else{
            AttendancesSchema.create({
                Email : req.body.Email,
                Date: req.body.Date
            })
            return res.json({Message : 'Attendence added'})
        }
});
})

//Route:2 create leave
router.post('/Markleave',[
    body('Email','Enter a valid email').isEmail(),
    body('Date','Enter a valid Date').exists()
],async (req,res)=>{
    //return errors if found
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check if leave exist
    let atten = AttendancesSchema.findOne({Email : req.body.Email,Date: req.body.Date}).then(atten=>{
        if(atten!==null){
            return res.status(400).json({error : 'Leave already exist'})
        }
        else{
            AttendancesSchema.create({
                Email : req.body.Email,
                Status : 'leave',
                Date: req.body.Date
            })
            return res.json({Message : 'Leave added'})
        }
});
})

//Route:3 viewAttendences/leaves
router.post('/ViewAttendencesUser',[
    body('Email','Enter a valid email').isEmail(),
],async (req,res)=>{
    //return errors if found
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //return all attendences
    let atten = AttendancesSchema.find({Email : req.body.Email}).then(atten=>{
        return res.json(atten)
});
})

//Route:4 viewAllAttendences/leaves
router.post('/ViewAllAttendences',[
    body('Email','Enter a valid email').isEmail(),
],async (req,res)=>{
    //return errors if found
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //return all attendences
    let atten = AttendancesSchema.find().then(atten=>{
        return res.json(atten)
});
})

//Route:5 change Attendence
router.post('/UpdateAttendence',[
    body('Email','Enter a valid email').isEmail(),
    body('Date','Enter a valid Date').exists()
],async (req,res)=>{
    //return errors if found
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check if Attendence exist
    let atten = AttendancesSchema.updateOne({Email : req.body.Email,Date: req.body.Date},{Status : req.body.Status}).then(atten=>{
        if(atten==null){
            return res.status(400).json({error : 'Not Found'})
        }
        else{
            return res.json({Message : 'Attendence Updated'})
        }
});
})

//Route:6 Attendences/leaves/Grades
router.post('/Grades',[
    body('Email','Enter a valid email').isEmail(),
],async (req,res)=>{
    //return errors if found
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //return all attendences
    let atten = AttendancesSchema.find({Email : req.body.Email}).then(atten=>{
        let p=0,a=0,l=0
        for (let i=0;i<atten.length;i++){
            if (atten[i].Status=="Present"){p++}
            if (atten[i].Status=="Absent"){a++}
            if (atten[i].Status=="leave"){l++}}
        let G=''
        if(p==0){G='G'}
            if(p>0 && p<=3){G='F'}
            if(p>3 && p<=6){G='E'}
            if(p>6 && p<=9){G='D'}
            if(p>9 && p<=12){G='C'}
            if(p>12 && p<=15){G='B'}
            if(p>15){G='A'}
        atten={p:p.toString(),
            a:a.toString(),
            l:l.toString(),
            G:G.toString()
        }
        return res.json(atten)
});
})


module.exports=router