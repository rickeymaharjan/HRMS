const mongoose = require("mongoose")
const LeaveRequest = require("../models/leaveModel")

const getAllLeaveRequests = (req, res) => {
  LeaveRequest.find({})
    .sort({ updatedAt: -1 })
    .then((leaves) => {
      return res.status(200).json(leaves)
    })
    .catch((error) => {
      return res.status(500).json({ error: "No leave found" })
    })
}

const getLeaveRequestById = (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such leave" })
  }

  LeaveRequest.findById(id)
    .then((leave) => {
      if (!leave) {
        return res.status(404).json({ error: "Leave not found" })
      }
      res.status(200).json(leave)
    })
    .catch((error) => {
      console.error("Error fetching leave:", error)
      res.status(500).json({ error: "Internal server error" })
    })
}

const getLeaveRequestByUserId = (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ error: "User not authenticated" })
  }

  const user_id = req.user._id

  if (!mongoose.Types.ObjectId.isValid(user_id)) {
    return res.status(404).json({ error: "No such leave" })
  }

  LeaveRequest.find({ user_id: user_id })
    .then((leave) => {
      if (!leave) {
        return res.status(404).json({ error: "Leave not found" })
      }
      res.status(200).json(leave)
    })
    .catch((error) => {
      console.error("Error fetching leave:", error)
      res.status(500).json({ error: "Internal server error" })
    })
}

const createLeaveRequest = (req, res) => {
  // Check if user is authenticated and user object exists in request
  if (!req.user || !req.user._id) {
    return res.status(401).json({ error: "User not authenticated" })
  }

  const user_id = req.user._id
  const { startDate, endDate, title, username, description } = req.body

  const newLeave = new LeaveRequest({
    user_id,
    startDate,
    endDate,
    title,
    description,
    username,
  })

  newLeave
    .save()
    .then((leave) => {
      res.status(201).json(leave)
    })
    .catch((error) => {
      console.error("Error creating leave:", error)
      res.status(500).json({ error: "Internal server error" })
    })
}

const deleteLeaveRequest = (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such leave" })
  }

  LeaveRequest.findByIdAndDelete(id)
    .then((leave) => {
      res.status(200).json(leave)
    })
    .catch((error) => {
      console.error("Error removing leave:", error)
      res.status(500).json({ error: "Internal server error" })
    })
}

const updateLeaveRequest = (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such leave" })
  }

  LeaveRequest.findByIdAndUpdate(id, { ...req.body }, { new: true })
    .then((leave) => {
      res.status(200).json(leave)
    })
    .catch((error) => {
      console.error("Error updating leave:", error)
      res.status(500).json({ error: "Internal server error" })
    })
}

module.exports = {
  getAllLeaveRequests,
  getLeaveRequestById,
  createLeaveRequest,
  deleteLeaveRequest,
  updateLeaveRequest,
  getLeaveRequestByUserId,
}
