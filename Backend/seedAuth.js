require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB for Seeding...");

        // Clear existing users to avoid duplicates during testing
        await User.deleteMany({});

        const salt = await bcrypt.genSalt(10);

        const users = [
            {
                name: "Admin User",
                email: "admin@food.com",
                password: await bcrypt.hash("admin123", salt),
                role: "admin"
            },
            {
                name: "sanjana",
                email: "koddikarsanjana@gmail.com",
                password: await bcrypt.hash("sanjana123", salt),
                role: "user"
            }
        ];

        await User.insertMany(users);
        console.log("✅ Seeded: admin@food.com (pass: admin123) and user@food.com (pass: user123)");
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedUsers();