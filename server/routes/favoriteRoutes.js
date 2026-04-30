const express = require("express");
const router = express.Router();
const db = require("../config/db");
const auth = require("../middleware/authMiddleware");

// ➕ Add to favorites
router.post("/:templateId", auth, async (req, res) => {
    try {
        const { templateId } = req.params;
        const userId = req.user.id;

        // already exists check
        const existing = await db("favorites")
            .where({ user_id: userId, template_id: templateId })
            .first();

        if (existing) {
            return res.status(400).json({ message: "Already favorited" });
        }

        await db("favorites").insert({
            user_id: userId,
            template_id: templateId
        });

        res.json({ message: "Added to favorites" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});

// 📄 Get my favorites
router.get("/", auth, async (req, res) => {
    try {
        const userId = req.user.id;

        const favorites = await db("favorites")
            .join("templates", "favorites.template_id", "templates.id")
            .where("favorites.user_id", userId)
            .select("templates.*");

        res.json(favorites);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;