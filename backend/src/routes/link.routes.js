const express = require("express");

const router = express.Router();

const controller = require("../controllers/link.controller");

const validateLink = require("../middleware/validateLink");

// Create
router.post("/", validateLink, controller.createLink);

// Get All
router.get("/", controller.getAllLinks);

// Redirect (MUST come before /:id)
router.get("/r/:shortCode", controller.redirectLink);

// Get By Id
router.get("/:id", controller.getLinkById);

// Update
router.put("/:id", validateLink, controller.updateLink);

// Enable / Disable
router.patch("/:id/status", controller.toggleStatus);

// Soft Delete
router.delete("/:id", controller.deleteLink);

module.exports = router;