const mongoose = require("mongoose")

const Schema = mongoose.Schema

// Creating a schema for the user
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["employee", "manager"],
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    status: {
      type: String,
      enum: ["onLeave", "working"],
      default: "working",
    },
    shifts: [
      {
        startTime: {
          type: String,
          required: true,
        },
        endTime: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
)

// Create a model from the schema
const User = mongoose.model("User", userSchema)

module.exports = User
