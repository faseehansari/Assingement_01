import mongoose from "mongoose";
import express from "express";
import Users from "./Schemas/User.js";

const PORT = 3000;

const app = express();

app.use(express.json());


// =========================
// HOME ROUTE
// =========================

app.get("/", (req, res) => {
    res.json({
        message: "CRUD API is running"
    });
});


// =========================
// CREATE USER
// POST /users
// =========================

app.post("/users", async (req, res) => {
    try {
        const user = await Users.create(req.body);

        res.status(201).json({
            message: "User created successfully",
            user
        });

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});


// =========================
// GET ALL USERS
// GET /users
// =========================

app.get("/users", async (req, res) => {
    try {
        const users = await Users.find();

        res.status(200).json(users);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});


// =========================
// GET SINGLE USER
// GET /users/:id
// =========================

app.get("/users/:id", async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user);

    } catch (err) {
        res.status(400).json({
            message: "Invalid user ID"
        });
    }
});


// =========================
// UPDATE USER
// PUT /users/:id
// =========================

app.put("/users/:id", async (req, res) => {
    try {
        const user = await Users.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User updated successfully",
            user
        });

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});


// =========================
// DELETE USER
// DELETE /users/:id
// =========================

app.delete("/users/:id", async (req, res) => {
    try {
        const user = await Users.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User deleted successfully",
            user
        });

    } catch (err) {
        res.status(400).json({
            message: "Invalid user ID"
        });
    }
});


// =========================
// MONGODB CONNECTION
// =========================

main()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection failed:", err);
    });


async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/myDBs");

    console.log("Mongoose connected");
}