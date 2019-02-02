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
    // Gets the game with a given search term
    // Reference 08_Stu_Recipes
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
    }
};