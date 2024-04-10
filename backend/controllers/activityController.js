const mongoose = require("mongoose")
const Activity = require("../models/activityModel")

const createActivity = (req, res) => {
    // const user_id = req.user._id
    const date = new Date()
    const { activity_type, user_id } = req.body

    const newActivity = new Activity ({
        user_id,
        activity_type,
        date
    })

    newActivity.save()
     .then((activity) => {
        return res.status(201).json(activity)
     })
     .catch(error => {
        return res.status(500).json({error: error})
     })

}

const getActivitiesByDate = (req, res) => {
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

    Activity.find({ date: { $gte: requestedDate, $lte: endDate } })
    .sort({ createdAt: -1 })
    .then((activities) => {
      if (activities.length > 0) {
        return res.status(200).json(activities)
      } else {
        return res
          .status(404)
          .json({ error: "No activities found for the specified date." })
      }
    })
    .catch((error) => {
      return res.status(500).json({ error: "Internal server error." })
    })
}

module.exports = {createActivity, getActivitiesByDate}