const express = require('express');
const router = express.Router();
const {
createLeave,
getAllLeaves,
updateLeave,
deleteLeave,
getLeaveById
} = require('../controllers/leaveController');

// Create a leave request
router.post("/", createLeave);

// Get all leave requests
router.get("/", getAllLeaves);

//Get leave by user ID
router.get("/user/userID", getLeaveById)

// Update a leave request
router.patch("/:id", updateLeave);

//Delete a leave 
router.delete("/:id", deleteLeave)

module.exports = router;
