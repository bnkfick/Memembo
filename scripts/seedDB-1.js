const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below
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
    gameGroup: "Food & Drink",
    audience: ["Adults"],
    gameName: "Mixology",
    gameCategories: ["Vodka", "Whiskey", "Gin", "Rum"],
    gameCategoryType: "cocktails",
    cardDetailsType: "recipe",
    username: "jschmoe",
    cardArray: []
  };

const cardSeed = [
  {
    cardName: "Godmother",
    category: "Vodka",
    details: ["2 parts Vodka", "1 part Amaretto"],
    clicked: false,
    src: "https://winedharma.com/sites/winedharma.com/files/imagecache/auto-768/story/1504-god-mother-cocktail-cocktail-con-amaretto-e-vodka-cocktail-after-dinner-cocktail-pi-famosi.jpg"
  },
  {
    cardName: "White Russian",
    category: "Vodka",
    details: ["2 parts Vodka", "1 part Kahlua", "1 part Cream"],
    clicked: false,
    src: "https://cdn.liquor.com/wp-content/uploads/2017/12/20073201/white-russian-720x720-article.jpg"
  },
  {
    cardName: "Greyhound",
    category: "Vodka",
    details:
      ["2 parts Vodka", "3 parts Grapefruit Juice"],
    clicked: false,
    src: "https://cdn.liquor.com/wp-content/uploads/2014/07/greyhound-new-recipe.png"
  },
  {
    cardName: "Moscow Mule",
    category: "Vodka",
    details:
      ["2 parts Vodka", "3 parts Ginger Beer", "2 Lime Wedges"],
    clicked: false,
    src: "https://www.baconismagic.ca/wp-content/uploads/2016/06/moscow-mule-h2.jpg"
  },
  {
    cardName: "Manhattan",
    category: "Whiskey",
    details:
      ["2 parts Bourbon", "1 part Sweet Vermouth", "2 dashes Bitters", "Cherry"],
    clicked: false,
    src: "https://cdn.liquor.com/wp-content/uploads/2012/09/04121600/bourbon-manhattan.jpg"
  },
  {
    cardName: "Paper Plane",
    category: "Whiskey",
    details:
      ["1 part Bourbon", "1 part Aperol", "1 part Amaro Nonino", "1 part Lemon Juice"],
    clicked: false,
    src: "https://cdn.liquor.com/wp-content/uploads/2015/09/17143340/ultimate-bourbon-cocktail-youve-never-heard-of-the-paper-plane-720x720-main-image-article-crop.jpg"
  },
  {
    cardName: "Old Fashioned",
    category: "Whiskey",
    details:
      ["Sugar Cube", "3 dashes Bitters", "3 parts Bourbon", "Lemon Twist"],
    clicked: false,
    src: "https://cdn.liquor.com/wp-content/uploads/2018/05/08113350/bourbon-old-fashioned-720x720-recipe.jpg"
  },
  {
    cardName: "Dubliner",
    category: "Whiskey",
    details:
      ["2 parts Whiskey", "0.25 part Sweet Vermouth", "0.25 part Grand Marnier", "2 dashes Bitters", "Cherry"],
    clicked: false,
    src: "http://www.ahistoryofdrinking.com/wordpress/wp-content/uploads/2013/03/Kilbeggan_Dubliner-Cocktail-620x300.jpeg"
  },
  {
    cardName: "Martinez",
    category: "Gin",
    details:
      ["2 parts Gin", "1 part Sweet Vermouth", "0.25 parts Maraschino Liqueur", "2 dashes Bitters", "Cherry"],
    clicked: false,
    src: "https://cdn.diffordsguide.com/contrib/stock-images/2018/5/25/20188c3b4150a4003215922b4eee84874e6c.jpg"
  },
  {
    cardName: "Paradise Cocktail",
    category: "Gin",
    details:
      ["1.5 parts Gin", "0.75 parts Apricot Brandy", "0.5 parts Orange Juice"],
    clicked: false,
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Paradise_cocktail.jpg/1200px-Paradise_cocktail.jpg"
  },
  {
    cardName: "Gimlet",
    category: "Gin",
    details:
      ["2.5 parts Gin", "0.75 parts Lime Cordial", "Lime Wedge"],
    clicked: false,
    src: "https://www.bombaysapphire.com/us/en/wp-content/uploads/cocktail_cache/gimlet-medium_1134x1004.jpg"
  },
  {
    cardName: "Tom Collins",
    category: "Gin",
    details:
      ["2.5 parts Gin", "1 part Lemon Juice", "0.75 parts Simple Syrup", "Club Soda", "Cherry", "Orange Slice"],
    clicked: false,
    src: "https://cdn.cdkitchen.com/recipes/images/2016/11/5714-6979-mx.jpg"
  },
  {
    cardName: "Bay Breeze",
    category: "Rum",
    details:
      ["2 parts Rum", "1.5 parts Cranberry Juice", "1.5 parts Pineapple Juice", "Lime Wedge"],
    clicked: false,
    src: "https://bevvyco.s3.amazonaws.com/img/drinks/mj/tmj/malibu-bay-breeze-81194dd65ed60e8c9ae41ba6da2c9fae-lg.jpg"
  },
  {
    cardName: "Daiquiri",
    category: "Rum",
    details:
      ["2 parts Rum", "1 part Lime Juice", "0.5 parts Simple Syrup"],
    clicked: false,
    src: "https://s3.us-east-2.amazonaws.com/tales-prod-mediabucket-1w7ck12fqo2qd/assets/images/2017/09/RY_o-dnrkLFa_660x0_mtdhGWCw.jpg"
  },
  {
    cardName: "Tropical Cocktail",
    category: "Rum",
    details:
      ["2 parts Dark Rum", "0.5 parts Pineapple Juice", "0.5 parts Lime Juice", "0.25 parts Grenadine", "2 dashes Bitters", ],
    clicked: false,
    src: "https://cdn.liquor.com/wp-content/uploads/2009/11/29153701/tropical-sunset-cocktail.jpg"
  },
  {
    cardName: "Scorpion",
    category: "Rum",
    details:
      ["2 parts Rum", "0.5 parts Brandy", "2 parts Orange Juice", "0.75 parts Lemon Juice", "0.5 parts Orgeat", "0.5 parts 151 Rum"],
    clicked: false,
    src: "https://www.thespruceeats.com/thmb/chIQswjakX4YLayql0Lo5oRiHB0=/1500x1000/filters:no_upscale():max_bytes(150000):strip_icc()/scorpion-cocktail-56a170bd3df78cf7726aaab1.jpg"
  },
];


createMany: function (req, res) {
  console.log("in insert Many")
  db.Brewery
    .insertMany()
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  //passing it an array, change it to handle multiple documents at once - insert many and then send one response
},

db.Card
  .deleteMany({})
  .then(() => db.Card.collection.insertMany(cardSeed))
  .then(data => {
    console.log(data.result.n + " cards inserted!");
    // console.log(data.insertedIds);
    for (let key in data.insertedIds) {
      gameSeed.cardArray.push(data.insertedIds[key]);
    }
    db.Game
      .deleteMany({})
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
