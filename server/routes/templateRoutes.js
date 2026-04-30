const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET all templates
router.get("/", async (req, res) => {
  try {
    const templates = await db("templates");
    res.json(templates);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET single template
router.get("/:id", async (req, res) => {
  try {
    const template = await db("templates")
      .where({ id: req.params.id })
      .first();

    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    res.json(template);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;