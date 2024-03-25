const express = require("express")
const router = express.Router()

// Getting controller functions
const {
  getAll,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController")

// Get all users
router.get("/", getAll)

// Get a user
router.get("/:id", getUser)

// Create a user
router.post("/", createUser)

// Delete a user
router.delete("/:id", deleteUser)

// Update a user
router.patch("/:id", updateUser)

// // Login user
// router.post("/login", loginUser)

// // Signup User
// router.post("/signup", signupUser)

module.exports = router
