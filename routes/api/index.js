const router = require("express").Router();
const gameRoutes = require("./games");
const cardRoutes = require("./cards");
const userRoutes = require("./users");

// Game routes
router.use("/games", gameRoutes);

// Card routes
router.use("/cards", cardRoutes);

// User routes
router.use("/users", userRoutes);

module.exports = router;
