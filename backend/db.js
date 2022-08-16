const mongoose = require("mongoose")
const mongoURL="mongodb+srv://ahmed:abin1234@cluster0.nx2wul9.mongodb.net/attendence?retryWrites=true&w=majority"
const connectToMongo=()=>{
    mongoose.connect(mongoURL,()=>{
        console.log("connected")
    })
}

module.exports=connectToMongo;