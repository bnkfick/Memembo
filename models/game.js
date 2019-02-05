
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  gameGroup: { type: String, required: true },
  audience: { type: Array, required: true },
  gameName: { type: String, required: true, unique: true },
  gameCategories: { type: Array, required: true },
  gameCategoryType: { type: String, default: "" },
  cardDetailsType: { type: String, required: true },
  username: { type: String, required: false },
  cardArray: [
    {
      type: Schema.Types.ObjectId,
      ref: "Card"
    }
  ]
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;