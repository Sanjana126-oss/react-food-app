const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Order Placed"},
    date: { type: Date, default: Date.now },
    payment: { type: Boolean, default: false }
     
});

module.exports = mongoose.model('Order', OrderSchema);
