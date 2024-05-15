const express = require("express")
const router = express.Router()
const {
  getAllLeaveRequests,
  getLeaveRequestById,
  createLeaveRequest,
  deleteLeaveRequest,
  updateLeaveRequest,
  getLeaveRequestByUserId,
} = require("../controllers/leaveController")

const requireAuth = require("../middleware/requireAuth")

router.use(requireAuth)

// Create a leave request
router.post("/", createLeaveRequest)

// Get all leave requests
router.get("/", getAllLeaveRequests)

//Get leave by user ID
router.get("/user", getLeaveRequestByUserId)

//Get leave by ID
router.get("/:id", getLeaveRequestById)

// Update a leave request
router.patch("/:id", updateLeaveRequest)

//Delete a leave
router.delete("/:id", deleteLeaveRequest)

module.exports = router
