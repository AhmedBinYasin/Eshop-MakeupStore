const mongoose = require("mongoose");

const viewAttendencesSchema = new mongoose.Schema({
    Date: { 
        type: String,
        required: true
    },
    Status: { type: String, default: 'Present' },
    Email: { type: String, required: true }

});

const viewAttendence = mongoose.model("attendances", viewAttendencesSchema)
module.exports = viewAttendence