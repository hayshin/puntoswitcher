const express = require("express");
const Template = require("../models/template");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.use(authMiddleware);

router.post("/", async (req, res) => {
  try {
    const { templates, text } = req.body;
    const template = new Template({ templates, text, owner: req.user.id });
    await template.save();
    res.status(201).json(template);
  } catch (error) {
    res.status(500).json({ message: "Error creating template", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const templates = await Template.find({ owner: req.user.id });
    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: "Error fetching templates", error });
  }
});

router.delete("/", async (req, res) => {
  try {
    const { templId } = req.body;
    await Template.deleteOne({ _id: templId, owner: req.user.id });
    res.json({ message: "Template deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting template", error });
  }
});

module.exports = router;
