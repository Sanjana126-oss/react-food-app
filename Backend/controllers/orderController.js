const Order = require("../models/Order");
const Food = require("../models/Food");

// 1. Place Order
exports.placeOrder = async (req, res) => {
    try {
        const newOrder = new Order({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        await newOrder.save();
        res.json({ success: true, message: "Order Placed" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// 2. User Orders (History)
exports.userOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.body.userId }).sort({ date: -1 });
        res.json({ success: true, data: orders });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// 3. List All Orders (Admin)
exports.listOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ date: -1 });
        res.json({ success: true, data: orders });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// 4. Update Status (Admin)
exports.updateStatus = async (req, res) => {
    try {
        await Order.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// 5. Admin Dashboard Stats
exports.getAdminStats = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const totalFood = await Food.countDocuments();
        const allOrders = await Order.find({});
        const totalRevenue = allOrders.reduce((acc, order) => acc + (Number(order.amount) || 0), 0);

        res.json({
            success: true,
            stats: { totalOrders, totalFood, totalRevenue }
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};