import axios from "axios";

export default {
    // Gets all games
    getGames: function() {
        return axios.get("/api/games");
    },
    // Gets the game with the given id
    getGame: function(id) {
        return axios.get(`/api/games/${id}`);
    },
    // Gets the game with a given search term==>Reference 08_Stu_Recipes
    // searchGame: function(id) {
    //     return axios.get(`/api/games/`, { params: { q: query}});
    // },

    // Deletes the game with the given id
    deleteGame: function(id) {
        return axios.delete(`/api/games/${id}`);
    },
    // Saves a game to the database
    saveGame: function(gameData) {
        return axios.post("/api/games", gameData);
    },
    
    //CARD API===============================
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