const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const multer = require("multer");
const db = require("./config/db");

const app = express();

// =========================
// MIDDLEWARE
// =========================
app.use(cors());
app.use(express.json());

// ✅ STATIC FILES (UPLOADS)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =========================
// MULTER CONFIG
// =========================
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// =========================
// IMAGE UPLOAD API
// =========================
app.post("/api/upload", upload.single("image"), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        res.json({
            message: "Image uploaded successfully",
            imageUrl: req.file.filename   // 👈 ONLY filename
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// =========================
// ROUTES
// =========================
const authRoutes = require("./routes/authRoutes");
const templateRoutes = require("./routes/templateRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/favorites", favoriteRoutes);

// =========================
// ROOT
// =========================
app.get("/", (req, res) => {
    res.send("API is running...");
});

// =========================
// DB TEST
// =========================
db.raw("SELECT 1")
    .then(() => console.log("PostgreSQL Connected"))
    .catch(err => console.log(err));

// =========================
// START SERVER
// =========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});