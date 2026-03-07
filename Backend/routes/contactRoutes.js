const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Admin logic to GET messages
router.get("/list", async (req, res) => {
    try {
        const messages = await Contact.find({});
        // We wrap it in an object { success: true, data: [...] } 
        // because that's what our Frontend expects
        res.json({ success: true, data: messages }); 
    } catch (error) {
        res.json({ success: false, message: "Error" });
    }
});

// User logic to SEND messages
router.post("/send", async (req, res) => {
    // ... (your existing send logic)
});

module.exports = router;