const mongoose = require("mongoose")

const Schema = mongoose.Schema

const activitySchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    activity_type:{
        type: String,
        enum: ["logout", "login", "absent", "present"],
        required: true
    },
    date: {
        type: Date,
        require: true
    }
}, { timestamps: true })

const Activity = mongoose.model("Activity", activitySchema)

module.exports = Activity