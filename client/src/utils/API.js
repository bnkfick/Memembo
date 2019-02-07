import axios from "axios";

export default {

    updateUserGames: function(id) {
        return axios.put(`/api/users/userGames/${id}`);
    },
    // populates the user with their games
    getUserGames: function(id) {
        return axios.get(`/api/users/userGames/${id}`);
    },
    //logs in user
    login: function(loginInfo) {
        return axios.post("/api/users/login", loginInfo);
    },

    //signs up user, then logs them in
    signup: function(signupInfo) {
        return axios.post("/api/users/signup", signupInfo);
    },

    //check if user is logged in, the return the user
    isLoggedIn: function() {
        return axios.get("/api/users/profile");
    },

    //checks to see if the user is logged in and andmin, then returns the user
    //I think this may need to be changed to /api/users/admin
    isAdmin: function() {
        return axios.get("/api/users/logout");
    },

    //logs out the user
    logout: function() {
        return axios.get("/api/users/logout");
    },

    setHighScore: function(id, highScore) {
        return axios.post(`/api/users/userScores/${id}`, highScore);
    },
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
    saveCard: function(cardData, gameID) {
        return axios.post("/api/cards", cardData);
    }
};