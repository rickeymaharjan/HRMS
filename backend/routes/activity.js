const express = require("express")
const router = express.Router()

const {
  createActivity,
  getActivitiesByDate,
} = require("../controllers/activityController")

const requireAuth = require("../middleware/requireAuth")

router.use(requireAuth)

router.post("/add", createActivity)

router.get("/date/:date", getActivitiesByDate)

module.exports = router
