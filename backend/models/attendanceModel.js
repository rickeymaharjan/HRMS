const mongoose = require("mongoose")

const Schema = mongoose.Schema

const attendanceSchema = new Schema (
    {
        user_id: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
          },
        status: {
            type: String,
            enum: ['present', 'absent'],
            default: 'absent'
          }
    },
    {timestamps: true}
);

const Attendance = mongoose.model("Attendance", attendanceSchema)

module.exports = Attendance