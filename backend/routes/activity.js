const express = require("express")
const router = express.Router()

const {createActivity, getActivitiesByDate} = require("../controllers/activityController")

router.post("/add", createActivity)

router.get("/date/:date", getActivitiesByDate)

module.exports = router