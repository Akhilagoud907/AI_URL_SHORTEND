const express = require("express");

const router = express.Router();

const analyticsController = require("../controllers/analytics.controller");

// Get Analytics by Link ID
router.get("/:id", analyticsController.getAnalytics);

module.exports = router;