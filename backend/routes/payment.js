// routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth")

router.use(requireAuth)
const {
    getPaymentById,
    createPayment,
} = require("../controllers/paymentController");



//  get payment by ID
router.get('/:id', getPaymentById);

//  create a new payment
router.post('/', createPayment);


module.exports = router;