const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion } = require('mongodb');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.MONGODB_USER_NAME}:${process.env.MONGODB_PASSWORD}@medical.d2lfg7x.mongodb.net/?retryWrites=true&w=majority&appName=medical`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let usersCollection;

async function run() {
    try {
        await client.connect();
        const db = client.db('medicalShop');
        usersCollection = db.collection('users');

        console.log("✅ Connected to MongoDB");

    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
    }
}
run();

// ✅ Keep routes outside so they work after connection

app.post('/users', async (req, res) => {
    try {
        const email = req.body.email;
        const userExists = await usersCollection.findOne({ email });
        if (userExists) {
            return res.status(200).send({ message: 'User already exists', inserted: false });
        }
        const result = await usersCollection.insertOne(req.body);
        res.send(result);
    } catch (error) {
        res.status(500).send("Error saving user");
    }
});

// Default Route
app.get("/", (req, res) => {
    res.send("Express server is running!");
});

app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
