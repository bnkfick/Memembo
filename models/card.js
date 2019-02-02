const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  _gameID: {
    type: Schema.Types.ObjectId,
    ref: "Game"
  },
  cardName: { type: String, required: true },
  src: { type: String },
  details: { type: Array, required: true },
  category: { type: String, required: true },
  clicked: { type: Boolean, default: false }
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
