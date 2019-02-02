const db = require("../models");

// Defining methods for the gamesController
module.exports = {
  findAll: function(req, res) {
    db.Game
      .find(req.query)
      .sort({ gameGroup: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findById: function(req, res) {
    console.log("NEW FINDBYID");
    db.Game
    .findById(req.params.id)
    // Specify that we want to populate the retrieved game with any associated cards
    .populate("cardArray")
    .then(dbGame => {
      // If the Game is found, send it to the client with any associated Cards
      console.log(dbGame);
      res.json(dbGame);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
    
  },
  create: function(req, res) {
    db.Game
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Game
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Game
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
