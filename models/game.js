const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  gameCategory: { type: String, required: true },
  audience: { type: Array, required: true },
  gameName: { type: String, required: true, unique: true },
  cardCategories: { type: Array, required: true },
  cards: [
    {
      type: Schema.Types.ObjectId,
      ref: "Card"
    }
  ]
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
