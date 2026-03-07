require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const foodRouter = require('./routes/foodRoutes');
const orderRouter = require('./routes/orderRoutes');
const authRouter = require('./routes/authRoutes');

// App Config
const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// DB Connection
connectDB();

// API Endpoints
app.use("/api/food", foodRouter);
app.use("/api/order", orderRouter);
app.use("/api/auth", authRouter);
// Inside server.js
app.use("/api/auth", require('./routes/authRoutes'));

// --- IMPORTANT: SERVE UPLOADED IMAGES ---
// This makes the 'uploads' folder accessible at http://localhost:5000/images
app.use("/images", express.static('uploads'));

app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

app.use("/api/newsletter", require('./routes/subscriberRoutes'));
app.use("/api/contact", require('./routes/contactRoutes'));

// At the top with other imports
const contactRouter = require('./routes/contactRoutes');

// Below your other app.use lines
app.use("/api/contact", contactRouter);