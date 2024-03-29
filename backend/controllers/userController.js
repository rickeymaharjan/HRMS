const mongoose = require("mongoose")

const User = require("../models/userModel")

// Getting all users
const getAll = (req, res) => {
  User.find({})
    .sort({ createdAt: -1 })
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((error) => {
      console.error("Error fetching users:", error)
      res.status(500).json({ error: "Internal server error" })
    })
}

// Getting a user
const getUser = (req, res) => {
  const { id } = req.params

  // Checking if the id is valid or not
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid user ID" })
  }

  User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" })
      }
      res.status(200).json(user)
    })
    .catch((error) => {
      console.error("Error fetching user:", error)
      res.status(500).json({ error: "Internal server error" })
    })
}

// Creating a user
const createUser = (req, res) => {
  const { username, email, password, gender } = req.body
  const role = "employee"
  const shifts = [{ startTime: "09:00", endTime: "17:00" }]
  const status = "working"

  const newUser = new User({
    username,
    email,
    password,
    gender,
    role,
    status,
    shifts,
  })

  newUser
    .save()
    .then((user) => {
      res.status(201).json(user)
    })
    .catch((error) => {
      console.error("Error creating user:", error)
      res.status(500).json({ error: "Internal server error" })
    })
}

// Deleting a user
const deleteUser = (req, res) => {
  const { id } = req.params

  // Checking if the id is valid or not
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid user ID" })
  }

  User.findByIdAndDelete(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" })
      }
      res.status(200).json(user)
    })
    .catch((error) => {
      console.error("Error deleting user:", error)
      res.status(500).json({ error: "Internal server error" })
    })
}

// Updating a user
const updateUser = (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid user ID" })
  }

  User.findByIdAndUpdate(id, { ...req.body }, { new: true })
    .then((user) => {
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({ error: "No user found" })
      }
    })
    .catch((error) => {
      console.error("Error updating user:", error)
      res.status(500).json({ error: "Internal server error" })
    })
}

module.exports = { getAll, getUser, createUser, deleteUser, updateUser }
