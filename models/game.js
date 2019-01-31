const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  gameName: { type: String, required: true, unique: true },
  gameCategories: { type: Array, required: true },
  cards: [
    {
      type: Schema.Types.ObjectId,
      ref: "Card"
    }
  ]
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
