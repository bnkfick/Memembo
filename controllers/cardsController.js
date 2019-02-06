const db = require("../models");

// Defining methods for the gamesController
module.exports = {
  findAll: function(req, res) {
    db.Card
      .find(req.query)
      .sort({ cardName: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Card
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    // let cardAdded = {};
    db.Card
      .create({
        //Have to break out since also passing game_id that is not part of card
        cardName: req.body.cardName,
        src: req.body.src,
        details: req.body.details,
        category: req.body.category,
        // clicked: false
      })
      .then((card) => {
      // cardAdded = card;f
      // console.log("Card Object: ", card)
      db.Game.findOneAndUpdate({ _id: req.body.game_id }, { $push: { cardArray: card._id } }, { new: true })
      })
      .then(game => res.json(game))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Card
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Card
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
