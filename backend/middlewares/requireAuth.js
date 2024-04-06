const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

async function requireAuth(req, res, next) {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "Access token is missing" })
  }

  try {
    const { _id } = jwt.verify(token, process.env.SECRET)
    req.user = await User.findOne({ _id }).select("_id")
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({ error: "Request is not authorized" })
  }
}

module.exports = requireAuth
