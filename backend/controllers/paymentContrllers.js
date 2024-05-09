const mongoose = require("mongoose");
const Payment = require("../models/paymentModel");

const getPaymentById = (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such payment" });
    }
  
    Payment.findById(id)
      .then((payment) => {
        if (!payment) {
          return res.status(404).json({ error: "Payment not found" });
        }
        res.status(200).json(payment);
      })
      .catch((error) => {
        console.error("Error fetching payment:", error);
        res.status(500).json({ error: "Internal server error" });
      });
  };

  const createPayment = (req, res) => {
    const { user_id, paymentDate, amountPaid } = req.body;
    const newPayment = new Payment({
      user_id,
      paymentDate,
      amountPaid,
    });
  
    newPayment
      .save()
      .then((payment) => {
        res.status(201).json(payment);
      })
      .catch((error) => {
        console.error("Error creating payment:", error);
        res.status(500).json({ error: "Internal server error" });
      });
  };
 
  module.exports = {
    getPaymentById,
    createPayment,

  };