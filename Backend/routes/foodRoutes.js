const express = require('express');
const { addFood, listFood, removeFood } = require('../controllers/foodController');
const multer = require('multer');

const foodRouter = express.Router();

// Image Storage Engine (Saves images in 'uploads' folder)
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        // Creates a unique name using the current timestamp + original name
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

// Route to add food with image (uses 'upload' middleware)
foodRouter.post("/add", upload.single("image"), addFood);

// Route to get all food items
foodRouter.get("/list", listFood);

// Route to remove food item
foodRouter.post("/remove", removeFood);

module.exports = foodRouter;