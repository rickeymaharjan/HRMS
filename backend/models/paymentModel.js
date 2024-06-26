// models/paymentModel.js
const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    paymentDate: {
      type: Date,
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    paidBy: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
)

const Payment = mongoose.model("Payment", paymentSchema)

module.exports = Payment
