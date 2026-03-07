const Food = require("../models/Food");
const fs = require('fs'); // Node.js File System module to handle file deletion

// 1. ADD FOOD ITEM
// This function receives the form data and the image from Multer
exports.addFood = async (req, res) => {
    try {
        // req.file.filename comes from the Multer middleware in foodRoutes.js
        let image_filename = `${req.file.filename}`;

        const food = new Food({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename // Stores the unique filename (e.g., 17123456.jpg)
        });

        await food.save();
        res.json({ success: true, message: "Food Added Successfully" });
    } catch (error) {
        console.log("Add Food Error:", error);
        res.json({ success: false, message: "Error adding food item" });
    }
};

// 2. LIST ALL FOOD
// This sends the entire menu to your React Home page and Admin list
exports.listFood = async (req, res) => {
    try {
        const foods = await Food.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log("List Food Error:", error);
        res.json({ success: false, message: "Error fetching food list" });
    }
};

// 3. REMOVE FOOD ITEM
// This deletes the data from MongoDB AND the physical file from your 'uploads' folder
exports.removeFood = async (req, res) => {
    try {
        // Find the food item by ID first to get the image name
        const food = await Food.findById(req.body.id);
        
        if (!food) {
            return res.json({ success: false, message: "Food item not found" });
        }

        // Delete the actual image file from the 'uploads' folder
        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) console.log("File deletion error:", err);
        });

        // Delete the entry from MongoDB Atlas
        await Food.findByIdAndDelete(req.body.id);

        res.json({ success: true, message: "Food Removed Successfully" });
    } catch (error) {
        console.log("Remove Food Error:", error);
        res.json({ success: false, message: "Error removing food item" });
    }
};