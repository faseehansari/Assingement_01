import mongoose from "mongoose";
import express from "express";
import Users from "./Schemas/User.js";

const PORT = 3000;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json('Hello World!');
});

app.get('/users', async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/users', async (req, res) => {
    try {
        const user = await Users.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
    console.log("Mongoose connected");
}