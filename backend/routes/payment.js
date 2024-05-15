// routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const {
    getPaymentById,
    createPayment,
    getPaymentByUserId,
    updatePayment,
    deletePayment
} = require("../controllers/paymentController");



//  get payment by ID
router.get('/:id', getPaymentById);

//  create a new payment
router.post('/', createPayment);

// get payment by userId
router.get("/user/:userId", getPaymentByUserId)

//Update payment
router.patch("/:id", updatePayment)

//Delete payment
router.delete("/:id", deletePayment)

module.exports = router;