const mongoose = require('mongoose')

const TestSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: [true,"userName is Duplicate"],
        required: [true, "userName is Required"],
        minlength: [3, "userName most be at least 3 characters"],
        maxlength: [30, "userName most be max 30 characters"]
    },
    userRegisteredName: {
        type: String,
        required: [true, "User Registered name is Required"]
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone number is required"],
        trim: true,
        match: [/^[6-9]\d{9}$/, "Enter a valid phone number"]
    },
    emailID: {
        type: String,
        lowercase: true,
        unique: [true,"emailID is Duplicate"],
        sparse: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"]
    },
    projectList: {
        type: [String],
        default : []
    },
    description: {
        type: String,
        default : ""
    }
}, { timestamps: true })

const Test = mongoose.model('Testing', TestSchema)
module.exports = Test