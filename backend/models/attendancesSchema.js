const mongoose = require("mongoose");

const attendancesSchema = new mongoose.Schema({
    Date: { 
        type: String,
        required: false
    },
    Status: { type: String, default: 'Present' },
    Email: { type: String, required: true }

});

const Attendance = mongoose.model("attendances", attendancesSchema)
module.exports = Attendance