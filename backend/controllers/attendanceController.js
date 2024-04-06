const mongoose = require("mongoose")
const Attendance = require("../models/attendanceModel")

const getAll = (req, res) => {
    Attendance.find({})
     .sort({createdAt: -1})
     .then((attendances) => {
        return res.status(200).json(attendances)
    })
     .catch(error => {
        return res.status(404).json({error: "No attendances found."})
     })
}

const getAttendance = (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no such attendance" })
    }

    Attendace.findById(id)
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
    const date = new Date()
    const { status } = req.body
    
    const newAttendance = new Attendance({
        status,
        user_id,
        date,
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


const deleteAttendance = (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no such attendance"})
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
        return res.status(404).json({ error: "no such attendance"})
    }
    
    Attendance.findByIdAndUpdate(id, { ...req.body }, { new : true})
    .then((attendance) => {
        res.status(200).json(attendance)
    })
    .catch((error) => {
        console.error("Error updating attendance:", error)
        res.status(500).json({ error: "Internal server error" })
    })
}

const getAttendanceByDate = (req, res) => {

    return res.status(200).json({message: "Attendance date for provided date."})
}
const getAttendanceByUserId = (req, res) => {
    const { userId } = req.params

    Attendance.find({ user_id: userId })
    .sort({createdAt: -1})
    .then((attendances) => {
       return res.status(200).json(attendances)
   })
    .catch(error => {
       return res.status(404).json({error: "No attendances found."})
    })
    
}

module.exports = {
    getAll,
    getAttendance,
    createAttendance,
    deleteAttendance,
    updateAttendance,
    getAttendanceByUserId,
    getAttendanceByDate
  }
  