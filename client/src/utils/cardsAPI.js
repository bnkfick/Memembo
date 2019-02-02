import axios from "axios";

export default {
  // Gets all cards
  getCards: function() {
    return axios.get("/api/cards");
  },
  // Gets the card with the given id
  getCard: function(id) {
    return axios.get(`/api/cards/${id}`);
  },
  // Deletes the card with the given id
  deleteCard: function(id) {
    return axios.delete(`/api/cards/${id}`);
  },
  // Saves a card to the database
  saveCard: function(cardData) {
    return axios.post("/api/cards", cardData);
  }
};