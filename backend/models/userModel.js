const mongoose = require("mongoose")

const Schema = mongoose.Schema

// Creating a schema for the user
const userSchema = new Schema(
  {
    name: {
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
      enum: ["employee", "HR"],
      required: true,
    },
    status: {
      type: String,
      enum: ["onLeave", "working"],
      default: "working",
    },
  },
  { timestamps: true }
)

// Create a model from the schema
const User = mongoose.model("User", userSchema)

module.exports = User
