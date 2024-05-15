const express = require("express")
const router = express.Router()

// Getting controller functions
const {
  getAll,
  getAttendance,
  createAttendance,
  updateAttendance,
  deleteAttendance,
  getAttendanceByDate,
  getAttendanceByUserId,
  getAttendanceByDateAndUser,
} = require("../controllers/attendanceController")

const requireAuth = require("../middleware/requireAuth")

router.use(requireAuth)

// Get all Attendance
router.get("/", getAll)

// Get an Attendance
// router.get("/:id", getAttendance)

// Search attendance by date
router.get("/date/:date", getAttendanceByDate)

// Search attendance by user ID
router.get("/user", getAttendanceByUserId)

router.get("/user/:date", getAttendanceByDateAndUser)

// Create an Attendance
router.post("/", createAttendance)

// Delete an Attendance
router.delete("/:id", deleteAttendance)

// Update an Attendance
router.patch("/:id", updateAttendance)

module.exports = router
