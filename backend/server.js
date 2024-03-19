require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")

// Express app
const app = express()

// Middleware
app.use(express.json())

// Request logger
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.get("/", (req, res) => {
  return res.json({ hello: "world" })
})

app.listen(process.env.PORT, () => {
  console.log(`Listening on port http://localhost:${process.env.PORT}`)
})
