require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const userRoutes = require("./routes/users")
const attendanceRoutes = require("./routes/attendance")
const activityRoutes = require("./routes/activity")
const leaveRoutes = require("./routes/leave")

// Express app
const app = express()

// Middleware
app.use(express.json())

// Request logger
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method)
  console.log("Path:  ", request.path)
  console.log("Body:  ", request.body)
  console.log("---")
  next()
}

app.use(requestLogger)

// Routes
app.use("/api/users", userRoutes)
app.use("/api/attendance", attendanceRoutes)
app.use("/api/activity", activityRoutes)
app.use("/api/leave", leaveRoutes)

app.get("/", (req, res) => {
  return res.json({ hello: "world" })
})

// connecting to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to the database.")
      console.log(`Listening on port http://localhost:${process.env.PORT}`)
    })
  })
  .catch((error) => {
    console.log("Error connecting to the database", error)
  })
