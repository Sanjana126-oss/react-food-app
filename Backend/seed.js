require('dotenv').config();
const mongoose = require('mongoose');
const Food = require('./models/Food'); // Adjust path if needed

const foodItems = [
    { name: "Pasta Carbonara", description: "Creamy pasta with bacon", price: 18, image: "url1", category: "Pasta" },
    { name: "Greek Salad", description: "Fresh veggies and feta", price: 12, image: "url2", category: "Salad" },
    { name: "Chocolate Cake", description: "Rich dark chocolate", price: 8, image: "url3", category: "Dessert" }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB for seeding...");
        
        // Delete existing food items so we don't have duplicates
        await Food.deleteMany({}); 
        
        // Insert the new list
        await Food.insertMany(foodItems);
        
        console.log("Database Seeded Successfully!");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();