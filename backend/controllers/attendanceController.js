const mongoose = require("mongoose")
const Attendance = require("../models/attendanceModel")

const getAll = (req, res) => {
  Attendance.find({})
    .sort({ createdAt: -1 })
    .then((attendances) => {
      return res.status(200).json(attendances)
    })
    .catch((error) => {
      return res.status(404).json({ error: "No attendances found." })
    })
}

const getAttendance = (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such attendance" })
  }

  Attendance.findById(id)
    .then((attendace) => {
      if (!attendace) {
        return res.status(404).json({ error: "Attendance not found" })
      }
      res.status(200).json(attendace)
    })
    .catch((error) => {
      console.error("Error fetching attendace:", error)
      res.status(500).json({ error: "Internal server error" })
    })
}

const createAttendance = (req, res) => {
  const user_id = req.user._id
  const currentDate = new Date().setHours(0, 0, 0, 0)

  // Check if an attendance entry exists for today and the user ID
  Attendance.findOne({ user_id, date: { $gte: currentDate } })
    .then((existingAttendance) => {
      if (existingAttendance) {
        // If attendance already exists for today, return an error
        return res
          .status(400)
          .json({ error: "Attendance already exists for today" })
      } else {
        // If attendance doesn't exist for today, create a new attendance entry
        const { status, username } = req.body

        const newAttendance = new Attendance({
          status,
          user_id,
          username,
          date: new Date(), // Use current date
        })

        newAttendance
          .save()
          .then((attendance) => {
            res.status(201).json(attendance)
          })
          .catch((error) => {
            console.error("Error creating user:", error)
            res.status(500).json({ error: "Internal server error" })
          })
      }
    })
    .catch((error) => {
      console.error("Error finding attendance:", error)
      res.status(500).json({ error: "Internal server error" })
    })
}

const deleteAttendance = (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such attendance" })
  }

  Attendance.findByIdAndDelete(id)
    .then((attendance) => {
      res.status(200).json(attendance)
    })
    .catch((error) => {
      console.error("Error removing attendance:", error)
      res.status(500).json({ error: "Internal server error" })
    })
}

const updateAttendance = (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such attendance" })
  }

  Attendance.findByIdAndUpdate(id, { ...req.body }, { new: true })
    .then((attendance) => {
      res.status(200).json(attendance)
    })
    .catch((error) => {
      console.error("Error updating attendance:", error)
      res.status(500).json({ error: "Internal server error" })
    })
}

const getAttendanceByDate = (req, res) => {
  const { date } = req.params

  // Parse the date string to a JavaScript Date object
  const requestedDate = new Date(date)

  if (isNaN(requestedDate)) {
    return res.status(400).json({ error: "Invalid date format." })
  }

  // Set the start of the requested date to 00:00:00
  requestedDate.setHours(0, 0, 0, 0)

  // Set the end of the requested date to 23:59:59
  const endDate = new Date(requestedDate)
  endDate.setHours(23, 59, 59, 999)

  Attendance.find({ createdAt: { $gte: requestedDate, $lte: endDate } })
    .sort({ createdAt: -1 })
    .then((attendances) => {
      if (attendances.length > 0) {
        return res.status(200).json(attendances)
      } else {
        return res
          .status(404)
          .json({ error: "No attendances found for the specified date." })
      }
    })
    .catch((error) => {
      return res.status(500).json({ error: "Internal server error." })
    })
}

const getAttendanceByUserId = (req, res) => {
  const user_id = req.user._id

  Attendance.find({ user_id: user_id })
    .sort({ createdAt: -1 })
    .then((attendances) => {
      return res.status(200).json(attendances)
    })
    .catch((error) => {
      return res.status(404).json({ error: "No attendances found." })
    })
}

const getAttendanceByDateAndUser = (req, res) => {
  const { date } = req.params
  const user_id = req.user._id

  // Parse the date string to a JavaScript Date object
  const requestedDate = new Date(date)

  if (isNaN(requestedDate)) {
    return res.status(400).json({ error: "Invalid date format." })
  }

  // Set the start of the requested date to 00:00:00
  requestedDate.setHours(0, 0, 0, 0)

  // Set the end of the requested date to 23:59:59
  const endDate = new Date(requestedDate)
  endDate.setHours(23, 59, 59, 999)

  Attendance.find({
    user_id,
    createdAt: { $gte: requestedDate, $lte: endDate },
  })
    .sort({ createdAt: -1 })
    .then((attendances) => {
      if (attendances.length > 0) {
        return res.status(200).json(attendances)
      } else {
        return res.status(404).json({
          error: "No attendances found for the specified user and date.",
        })
      }
    })
    .catch((error) => {
      return res.status(500).json({ error: "Internal server error." })
    })
}

module.exports = {
  getAll,
  getAttendance,
  createAttendance,
  deleteAttendance,
  updateAttendance,
  getAttendanceByUserId,
  getAttendanceByDate,
  getAttendanceByDateAndUser,
}
