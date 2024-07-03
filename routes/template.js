const express = require("express");
const Template = require("../models/template");
const router = express.Router();

// Create template endpoint
router.post("/", async (req, res) => {
  const { templates, text, userId } = req.body;
  try {
    const template = new Template({ templates, text, owner: userId });
    await template.save();
    res.status(201).json(template);
  } catch (error) {
    res.status(500).json({ message: "Error creating template", error });
  }
});

// Get templates endpoint
router.get("/:userId", async (req, res) => {
  try {
    const templates = await Template.find({ owner: req.params.userId });
    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: "Error fetching templates", error });
  }
});

// Delete template endpoint
router.delete("/", async (req, res) => {
  const { templId, userId } = req.body;
  try {
    await Template.deleteOne({ _id: templId, owner: userId });
    res.json({ message: "Template deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting template", error });
  }
});

module.exports = router;
