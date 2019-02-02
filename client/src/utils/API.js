import axios from "axios";

export default {
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
    }
};