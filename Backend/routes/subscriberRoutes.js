const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');

// Route to handle newsletter subscription
router.post("/subscribe", async (req, res) => {
    try {
        const { email } = req.body;
        
        // Check if already subscribed
        const exists = await Subscriber.findOne({ email });
        if (exists) return res.json({ success: false, message: "Already Subscribed!" });

        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();
        
        res.json({ success: true, message: "Subscribed Successfully!" });
    } catch (error) {
        res.json({ success: false, message: "Error subscribing" });
    }
});

module.exports = router;