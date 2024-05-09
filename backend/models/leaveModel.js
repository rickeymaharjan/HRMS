const mongoose = require("mongoose")

const Schema = mongoose.Schema

const LeaveSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    reviewedBy: {
      type: String,
    },
  },
  { timestamps: true }
)

const LeaveRequest = mongoose.model("LeaveRequest", LeaveSchema)

module.exports = LeaveRequest
