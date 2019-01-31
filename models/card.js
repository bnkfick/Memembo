const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  itemName: { type: String, required: true },
  category: { type: String, required: true },
  definition: {type: Array, required: true },
  src: { type: String }
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;