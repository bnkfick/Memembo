const mongoose = require("mongoose");
const db = require("../models");



mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/memoryGame"
);

let gameSeed = 
  {
    gameGroup: "Artists",
    audience: ["All"],
    gameName: "Famous Art",
    gameCategories: ["Vincent van Gogh", "Claude Monet", "Leonardo da Vinci", "Edgar Degas"],
    gameCategoryType: "artwork",
    cardDetailsType: "information",
    cardArray: []
  };

const cardSeed = [
  {
    cardName: "A Starry Night",
    category: "Vincent van Gogh",
    details: ["The Starry Night is an oil on canvas painted in June 1889 by the Dutch post-impressionist painter."],
    clicked: false,
    src: "http://www.moma.org/media/W1siZiIsIjEzMzA3NSJdLFsicCIsImNvbnZlcnQiLCItcmVzaXplIDIwMDB4MjAwMFx1MDAzZSJdXQ.jpg?sha=df9568c2c27b4c27"
  },
  {
    cardName: "Mona Lisa",
    category: "Leonardo da Vinci",
    details: ["A portrait believed to have been painted between 1503 and 1506 during the Italian Renaissance."],
    clicked: false,
    src: "https://news.artnet.com/app/news-upload/2014/07/Mona_Lisa.jpg"
  },
  {
    cardName: "Haystacks",
    category: "Edgar Degas",
    details: ["Haystacks is a title of a series of impressionist paintings."],
    clicked: false,
    src: "https://www.claude-monet.com/images/paintings/haystack-snow-effect.jpg"
  },
  {
    cardName: "Sunflowers",
    category: "Vincent van Gogh",
    details: ["Sunflowers is the name of two series of still life paintings in the late 1880's."],
    clicked: false,
    src: "https://www.vincentvangogh.org/images/paintings/sunflowers.jpg"
  },
  {
    cardName: "Bedroom in Arles",
    category: "Vincent van Gogh",
    details: ["Bedroom in Arles is the title given to each of three similar paintings by 19th-century."],
    clicked: false,
    src: "https://www.vincentvangogh.org/images/paintings/the-bedroom-at-arles.jpg"
  },
  {
    cardName: "The Last Supper",
    category: "Leonardo da Vinci",
    details:
      ["The Last Supper depicts Jesus Christ and his 12 disciples painted in 1495 and 1498."],
    clicked: false,
    src: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/10-the-last-supper-leonardo-da-vinci.jpg"
  },
  {
    cardName: "Vitruvian Man",
    category: "Leonardo da Vinci",
    details:
      ["The drawing depicts a man in two superimposed positions within a square and circle.  Named after the architect Vitruvius."],
    clicked: false,
    src: "https://imgc.allpostersimages.com/img/print/u-g-F1IMTV0.jpg?w=550&h=550&p=0"
  },
  {
    cardName: "Woman with a Parasol",
    category: "Claude Monet",
    details:
      ["An oil-on-canvas from 1875 depicting his wife Camille Monet and their son Jean Monet."],
    clicked: false,
    src: "https://www.claude-monet.com/images/paintings/woman-with-a-parasol.jpg"
  },
  {
    cardName: "Water Lilies and the Japanese bridge",
    category: "Claude Monet",
    details:
      ["An inspired vision of cool greens and calm, reflective waters, enhanced by exotic plants such as bamboo, ginkgo, and Japanese fruit trees and a Japanese footbridge."],
    clicked: false,
    src: "https://www.claude-monet.com/images/paintings/water-lily-pond-with-japanese-bridge.jpg"
  },
  {
    cardName: "Water Lilies, Green Harmony",
    category: "Claude Monet",
    details:
      ["Water Lilies is a series of approximately 250 oil paintings depicting a flower garden in Giverny."],
    clicked: false,
    src: "https://www.claude-monet.com/images/paintings/water-lilies-green-harmony.jpg"
  },
  {
    cardName: "Fishing Boats on the Beach at Saintes-Maries",
    category: "Vincent van Gogh",
    details:
      ["Saintes-Maries is the subject of a series of paintings made in 1888"],
    clicked: false,
    src: "https://www.vincentvangogh.org/images/paintings/fishing-boats-on-the-beach.jpg"
  },
  {
    cardName: "The Absinthe Drinker",
    category: "Edgar Degas",
    details:
      ["The artist's most famous painting is a representation of the increasing social isolation in Paris during its stage of rapid growth."],
    clicked: false,
    src: "https://learnodo-newtonic.com/wp-content/uploads/2013/07/The-Absinthe-Drinker-by-Edgar-Degas.jpg"
  },
  {
    cardName: "Ballet Rehearsal Onstage",
    category: "Edgar Degas",
    details:
      ["A favorite subject painted in 1874."],
    clicked: false,
    src: "https://media.overstockart.com/optimized/cache/data/product_images/overstockart_2374_1219407615-1000x1000.jpg"
  },
  {
    cardName: "After the Bath, Woman Drying Herself",
    category: "Edgar Degas",
    details: ["A pastel drawing by Edgar Degas, made some time between 1890 and 1895"],
    clicked: false,
    src: "https://www.nationalgallery.org.uk/server.iip?FIF=/fronts/N-6295-00-000019-WZ-PYR.tif&CNT=1&HEI=371&QLT=85&CVT=jpeg"
  },
  {
    cardName: "Café Terrace at Night",
    category: "Vincent van Gogh",
    details:
      ["Café Terrace at Night was painted in Arles, France, in mid-September 1888"],
    clicked: false,
    src: "data:image/jpeg;base64,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"
  },
  {
    cardName: "Two Dancers on Stage",
    category: "Edgar Degas",
    details:
      ["Oil on Canvas painted in "],
    clicked: false,
    src: "https://artisticjunkie.com/wp-content/uploads/2017/08/Edgar-Degas-Two-Dancers-on-Stage.jpg"
  },
];

db.Card
  .remove({})
  .then(() => db.Card.collection.insertMany(cardSeed))
  .then(data => {
    console.log(data.result.n + " cards inserted!");
    console.log(data.insertedIds);
    for (let key in data.insertedIds) {
      gameSeed.cardArray.push(data.insertedIds[key]);
    }
    db.Game
      .remove({})
      .then(() => db.Game.collection.insertOne(gameSeed))
      .then(data => {
        console.log(data.result.n + " games inserted!");
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
