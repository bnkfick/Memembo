const router = require("express").Router();
const gameRoutes = require("./games");
const cardRoutes = require("./cards");

// Game routes
router.use("/games", gameRoutes);

// Card routes
router.use("/cards", cardRoutes);

module.exports = router;
