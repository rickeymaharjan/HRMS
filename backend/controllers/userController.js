const User = require("../models/userModel")

const getAll = (req, res) => {
  return res.status(200).json({ message: "all users" })
}

const getUser = (req, res) => {
  return res.status(200).json({ message: "one user" })
}

const createUser = (req, res) => {
  return res.status(200).json({ message: "user created" })
}

const deleteUser = (req, res) => {
  return res.status(200).json({ message: "user deleted" })
}

const updateUser = (req, res) => {
  return res.status(200).json({ message: "user updated" })
}

module.exports = { getAll, getUser, createUser, deleteUser, updateUser }
