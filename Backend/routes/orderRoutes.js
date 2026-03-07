const express = require('express');
const router = express.Router();
const { placeOrder, listOrders, updateStatus, userOrders, getAdminStats } = require('../controllers/orderController');

// User Routes
router.post("/place", placeOrder);
router.post("/userorders", userOrders);

// Admin Routes
router.get("/list", listOrders);
router.post("/status", updateStatus);
router.get("/stats", getAdminStats);

module.exports = router;