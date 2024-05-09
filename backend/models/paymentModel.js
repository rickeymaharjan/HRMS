// models/paymentModel.js
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  amountPaid: {
    type: Number,
    required: true,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;