const router = require("express").Router();
const cardsController = require("../../controllers/cardsController");

// Matches with "/api/cards"
router.route("/")
  .get(cardsController.findAll)
  .post(cardsController.create);

// Matches with "/api/cards/:id"
router.route("/:id")
  .get(cardsController.findById)
  .put(cardsController.update)
  .delete(cardsController.remove);

module.exports = router;