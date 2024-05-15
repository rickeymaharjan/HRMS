const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

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
      default: "1234",
      required: true,
    },
    role: {
      type: String,
      enum: ["Employee", "Manager"],
      default: "Employee",
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["On Leave", "Working"],
      default: "Working",
    },
    shifts: {
      startTime: {
        type: String,
        required: true,
      },
      endTime: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
)

// Static functions

// Login
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fields must be filled.")
  }

  try {
    // Check if the email is already in use
    const user = await this.findOne({ email })

    if (!user) {
      throw new Error("Invalid email.")
    }

    // Comparing password
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      throw new Error("Invalid password.")
    }

    return user
  } catch (error) {
    throw error
  }
}

// Signup
userSchema.statics.signup = async function (username, email, password, gender) {
  if (!email || !password || !username || !gender) {
    throw new Error("All fields must be filled")
  }

  // Check if the email is valid or not
  if (!validator.isEmail(email)) {
    throw new Error("Please enter a valid email")
  }

  // Check if the password is strong enough
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password not strong enough")
  }

  try {
    // Check if the email is already in use
    const existingUser = await this.findOne({ email })
    if (existingUser) {
      throw new Error("Email already in use")
    }

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const role = "employee"
    const shifts = { startTime: "09:00", endTime: "17:00" }
    const status = "working"

    // Create and save the user
    const newUser = new this({
      username,
      email,
      password: hashedPassword,
      gender,
      role,
      shifts,
      status,
    })
    await newUser.save()

    // Return the newly created user
    return newUser
  } catch (error) {
    throw error
  }
}

// Create a model from the schema
const User = mongoose.model("User", userSchema)

module.exports = User
