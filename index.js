const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");


// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 5000;
console.log(port);

// Middleware
app.use(cors());
app.use(express.json());

// Sample route
app.get("/", (req, res) => {
    res.send("Express server is running!");
});


// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});