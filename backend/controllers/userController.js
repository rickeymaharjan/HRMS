const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/userModel");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "3d" });
};

// Getting all users
const getAll = (req, res) => {
  User.find({})
    .sort({ createdAt: -1 })
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

// Getting a user
const getUser = (req, res) => {
  const { id } = req.params;

  // Checking if the id is valid or not
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid user ID" });
  }

  User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    })
    .catch((error) => {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

// Creating a user
const createUser = async (req, res) => {
  const { username, email, password, gender } = req.body;
  const role = "employee";
  const shifts = { startTime: "09:00", endTime: "17:00" };
  const status = "working";

  // Generate salt and hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    gender,
    role,
    status,
    shifts,
  });

  newUser
    .save()
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

// Deleting a user
const deleteUser = (req, res) => {
  const { id } = req.params;

  // Checking if the id is valid or not
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid user ID" });
  }

  User.findByIdAndDelete(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

// Updating a user
const updateUser = (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid user ID" });
  }

  User.findByIdAndUpdate(id, { ...req.body }, { new: true })
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "No user found" });
      }
    })
    .catch((error) => {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

// Login user
const loginUser = (req, res) => {
  const { email, password } = req.body;
  User.login(email, password)
    .then((user) => {
      const token = createToken(user.id);
      const { id, email, shifts, role, gender, username } = user;
      return res
        .status(200)
        .json({ id, email, role, shifts, gender, username, token });
    })
    .catch((error) => {
      return res.status(400).json({ error: error.message });
    });
};

// Signup user
const signupUser = (req, res) => {
  const { username, email, password, gender } = req.body;

  User.signup(username, email, password, gender)
    .then((user) => {
      const token = createToken(user.id);
      return res.status(200).json({ email, token });
    })
    .catch((error) => {
      return res.status(400).json({ error: error.message });
    });
};

module.exports = {
  getAll,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  loginUser,
  signupUser,
};
