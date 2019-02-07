const mongoose = require("mongoose");
const db = require("../models");

//If deployed, use the deployed database.  Otherwise use the local mongo database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/memoryGame"

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('MongoDB Seeded...'))


// mongoose.connect(
//   process.env.MONGODB_URI ||
//   "mongodb://localhost/memoryGame"
// );

let gameSeed = 
  {
    gameGroup: "Art",
    audience: ["All"],
    gameName: "Famous Art",
    gameCategories: ["Impressionist", "Post Impressionist"],
    gameCategoryType: "artwork",
    cardDetailsType: "information",
    cardArray: []
  };

const cardSeed = [
  {
    cardName: "Edgar Degas",
    category: "Impressionist",
    details: ["Two Dancers on Stage"],
    clicked: false,
    src: "https://artisticjunkie.com/wp-content/uploads/2017/08/Edgar-Degas-Two-Dancers-on-Stage.jpg"
  },
  {
    cardName: "Vincent van Gogh",
    category: "Post Impressionist",
    details: ["The Starry Night"],
    clicked: false,
    src: "http://www.moma.org/media/W1siZiIsIjEzMzA3NSJdLFsicCIsImNvbnZlcnQiLCItcmVzaXplIDIwMDB4MjAwMFx1MDAzZSJdXQ.jpg?sha=df9568c2c27b4c27"
  },
  {
    cardName: "Paul Gaugin",
    category: "Post Impressionist",
    details: ["Hail Mary"],
    clicked: false,
    src: "https://learnodo-newtonic.com/wp-content/uploads/2016/05/Ia-Orana-Maria-1891-Paul-Gauguin.jpg"
  },
  {
    cardName: "Edgar Degas",
    category: "Impressionist",
    details: ["Haystacks"],
    clicked: false,
    src: "https://www.claude-monet.com/images/paintings/haystack-snow-effect.jpg"
  },
  {
    cardName: "Vincent van Gogh",
    category: "Post Impressionist",
    details: ["Sunflowers"],
    clicked: false,
    src: "https://www.vincentvangogh.org/images/paintings/sunflowers.jpg"
  },
  {
    cardName: "Vincent van Gogh",
    category: "Post Impressionist",
    details: ["Bedroom in Arles"],
    clicked: false,
    src: "https://www.vincentvangogh.org/images/paintings/the-bedroom-at-arles.jpg"
  },
  {
    cardName: "Paul Gaugin",
    category: "Post Impressionist",
    details:["Still Life with Puppies"],
    clicked: false,
    src: "https://www.tate.org.uk/sites/default/files/styles/grid-normal-12-cols/public/images/gauguin-still-life-with-puppies.jpg?itok=zQeFryZR"
  },
  {
    cardName: "Paul Gaugin",
    category: "Post Impressionist",
    details:["Tahitian Women on the Beach"],
    clicked: false,
    src: "https://www.gauguin.org/images/paintings/tahitian-women-on-the-beach.jpg"
  },
  {
    cardName: "Claude Monet",
    category: "Impressionist",
    details:["Woman with a Parasol"],
    clicked: false,
    src: "https://www.claude-monet.com/images/paintings/woman-with-a-parasol.jpg"
  },
  {
    cardName: "Claude Monet",
    category: "Impressionist",
    details: ["Water Lilies and the Japanese Bridge"],
    clicked: false,
    src: "https://www.claude-monet.com/images/paintings/water-lily-pond-with-japanese-bridge.jpg"
  },
  {
    cardName: "Claude Monet",
    category: "Impressionist",
    details: ["Water Lilies, Green Harmony"],
    clicked: false,
    src: "https://www.claude-monet.com/images/paintings/water-lilies-green-harmony.jpg"
  },
  {
    cardName: "Vincent van Gogh",
    category: "Post Impressionist",
    details: ["Fishing Boats on the Beach at Saintes-Maries"],
    clicked: false,
    src: "https://www.vincentvangogh.org/images/paintings/fishing-boats-on-the-beach.jpg"
  },
  {
    cardName: "Edgar Degas",
    category: "Impressionist",
    details:  ["The Absinthe Drinker"],
    clicked: false,
    src: "https://learnodo-newtonic.com/wp-content/uploads/2013/07/The-Absinthe-Drinker-by-Edgar-Degas.jpg"
  },
  {
    cardName: "Edgar Degas",
    category: "Impressionist",
    details: ["Ballet Rehearsal Onstage"],
    clicked: false,
    src: "https://media.overstockart.com/optimized/cache/data/product_images/overstockart_2374_1219407615-1000x1000.jpg"
  },
  {
    cardName: "Edgar Degas",
    category: "Impressionist",
    details: ["After the Bath, Woman Drying Herself"],
    clicked: false,
    src: "https://www.nationalgallery.org.uk/server.iip?FIF=/fronts/N-6295-00-000019-WZ-PYR.tif&CNT=1&HEI=371&QLT=85&CVT=jpeg"
  },
  {
    cardName: "Vincent van Gogh",
    category: "Post Impressionist",
    details: ["Café Terrace"],
    clicked: false,
    src: "https://www.vincentvangogh.org/images/paintings/cafe-terrace-at-night.jpg"
  },
];

db.Card
  .find({})
  .then(() => db.Card.collection.insertMany(cardSeed))
  .then(data => {
    console.log(data.result.n + " cards inserted!");
    // console.log(data.insertedIds);
    for (let key in data.insertedIds) {
      gameSeed.cardArray.push(data.insertedIds[key]);
    }
    db.Game
      .find({})
      .then(() => db.Game.collection.insertOne(gameSeed))
      .then(data => {
        console.log(data.result.n + " game inserted!");
        console.log("Game _ID: ", data.insertedId);
        console.log("Game Data:", data.ops[0]);
        process.exit(0);
      })
      .catch(err => {
        console.error(err);
        process.exit(1);
      })
    // process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
