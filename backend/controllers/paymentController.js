const mongoose = require("mongoose")
const Payment = require("../models/paymentModel")

const getPayments = (req, res) => {
  Payment.find({})
    .sort({ createdAt: -1 })
    .then((payments) => {
      return res.status(200).json(payments)
    })
    .catch((error) => {
      console.log("Error fetching paymenst: ", error)
      res.status(500).json({ error: "Internal server error" })
    })
}

const getPaymentById = (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such payment" })
  }

  Payment.findById(id)
    .then((payment) => {
      if (!payment) {
        return res.status(404).json({ error: "Payment not found" })
      }
      res.status(200).json(payment)
    })
    .catch((error) => {
      console.error("Error fetching payment:", error)
      res.status(500).json({ error: "Internal server error" })
    })
}

const createPayment = (req, res) => {
  const { paymentDate, amountPaid, paidBy, username, status, user_id } =
    req.body

  const newPayment = new Payment({
    user_id,
    paymentDate,
    amountPaid,
    paidBy,
    username,
    status,
  })

  newPayment
    .save()
    .then((payment) => {
      res.status(201).json(payment)
    })
    .catch((error) => {
      console.error("Error creating payment:", error)
      res.status(500).json({ error: "Internal server error" })
    })
}
const updatePayment = (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such payment" })
  }

  Payment.findByIdAndUpdate(id, { ...req.body }, { new: true })
    .then((payment) => {
      res.status(200).json(payment)
    })
    .catch((error) => {
      console.error("Error updating payment:", error)
      res.status(500).json({ error: "Internal server error" })
    })
}

const deletePayment = (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such payment" })
  }

  Payment.findByIdAndDelete(id)
    .then((payment) => {
      res.status(200).json(payment)
    })
    .catch((error) => {
      console.error("Error removing payment:", error)
      res.status(500).json({ error: "Internal server error" })
    })
}

const getPaymentByUserId = (req, res) => {
  const { userId } = req.params

  Payment.find({ user_id: userId })
    .sort({ createdAt: -1 })
    .then((payment) => {
      return res.status(200).json(payment)
    })
    .catch((error) => {
      return res.status(404).json({ error: "No payment found." })
    })
}

module.exports = {
  getPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
  getPaymentByUserId,
}
