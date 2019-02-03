const express = require("express");

const mongoose = require("mongoose");
const logger = require("morgan");
const routes = require("./routes")
const app = express();
const session = require("express-session");
const passport = require("passport");
const flash = require('connect-flash');
const PORT = process.env.PORT || 3001;

// Require all models
// const db = require("./models");


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
  secret: "not secret",
  resave: false,
  saveUninitialize: true,
  // cookie: {secure: true}
}));
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
} 

// Use morgan logger for logging requests
app.use(logger("dev"));

// Add routes, both API and view
app.use(routes);

//If deployed, use the deployed database.  Otherwise use the local mongo database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/memoryGame"

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected...'))

// Send every other request to the React app
// Define any API routes before this runs
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
