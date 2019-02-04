const mongoose = require("mongoose");
const db = require("../models");



mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/memoryGame"
);

let gameSeed = 
  {
    gameGroup: "Language",
    audience: ["Pre-K"],
    gameName: "Learn Colors, Numbers in English and Spanish",
    gameCategories: ["Color", "Number"],
    gameCategoryType: "",
    cardDetailsType: "word in spanish",
    cardArray: []
  };

const cardSeed = [
  {
    cardName: "Green",
    category: "Color",
    details: ["Verde"],
    clicked: false,
    src: "http://images6.fanpop.com/image/photos/34500000/Green-Wallpaper-colors-34511117-1280-800.jpg"
  },
  {
    cardName: "Red",
    category: "Color",
    details: ["Rojo"],
    clicked: false,
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Strawberries.jpg/1200px-Strawberries.jpg"
  },
  {
    cardName: "Yellow",
    category: "Color",
    details: ["Amarillo"],
    clicked: false,
    src: "http://www.lecreusetshop.co.za/blog/wp-content/uploads/2014/03/Le-Creuset-Dijon-Soleil-Yellow-Lemons.jpg"
  },
  {
    cardName: "Blue",
    category: "Color",
    details: ["Azul"],
    clicked: false,
    src: "https://www.desktopbackground.org/p/2010/08/02/57936_cool-blue-hd-wallpaper-cool-blue-images-new-wallpapers_1920x1200_h.jpg"
  },
  {
    cardName: "Purple",
    category: "Color",
    details: ["Purpura"],
    clicked: false,
    src: "https://cdn.cnn.com/cnnnext/dam/assets/160317102800-purple-eggplant-super-169.jpg"
  },
  {
    cardName: "Orange",
    category: "Color",
    details:
      ["Naranja"],
    clicked: false,
    src: "https://xzdl43v0mdf2m45tz2aj7kkv35-wpengine.netdna-ssl.com/wp-content/uploads/2010/10/orange-780x400.jpg"
  },
  {
    cardName: "One",
    category: "Number",
    details:
      ["Uno"],
    clicked: false,
    src: "http://www.clker.com/cliparts/C/G/j/0/u/S/animal-number-one.svg"
  },
  {
    cardName: "Two",
    category: "Number",
    details:
      ["Dos"],
    clicked: false,
    src: "https://gallery.yopriceville.com/var/albums/Free-Clipart-Pictures/Decorative-Numbers/Cute_Number_Two_PNG_Clipart_Image.png?m=1437447301"
  },
  {
    cardName: "Three",
    category: "Number",
    details:
      ["Tres"],
    clicked: false,
    src: "http://www.clker.com/cliparts/I/D/Z/Z/a/w/animal-number-three.svg"
  },
  {
    cardName: "Four",
    category: "Number",
    details:
      ["Quatro"],
    clicked: false,
    src: "https://banner2.kisspng.com/20171128/5c1/cute-number-four-png-clipart-image-5a1d48e6931ac1.5684408415118686466025.jpg"
  },
  {
    cardName: "Five",
    category: "Number",
    details:
      ["Cinco"],
    clicked: false,
    src: "http://www.clker.com/cliparts/9/g/b/m/E/I/animal-number-five.svg"
  },
  {
    cardName: "Six",
    category: "Number",
    details:
      ["Seis"],
    clicked: false,
    src: "https://gallery.yopriceville.com/var/albums/Free-Clipart-Pictures/Decorative-Numbers/Cute_Number_Six_PNG_Clipart_Image.png?m=1437447301"
  },
  {
    cardName: "Seven",
    category: "Number",
    details:
      ["Siete"],
    clicked: false,
    src: "http://www.clker.com/cliparts/E/C/r/G/E/Y/animal-number-seven.svg"
  },
  {
    cardName: "Eight",
    category: "Number",
    details: ["Ocho"],
    clicked: false,
    src: "https://content.mycutegraphics.com/graphics/number/cartoon-number-eight.png"
  },
  {
    cardName: "Nine",
    category: "Number",
    details:
      ["Nueve"],
    clicked: false,
    src: "https://previews.123rf.com/images/yaskii/yaskii1104/yaskii110400002/9221541-number-nine-floral-vector-.jpg"
  },
  {
    cardName: "Ten",
    category: "Number",
    details:
      ["Diez"],
    clicked: false,
    src: "https://previews.123rf.com/images/drizzd/drizzd1302/drizzd130200004/17705972-cartoon-number-ten-on-white-background-3d-illustration.jpg"
  },
];

db.Card
  .find({})
  .then(() => db.Card.collection.insertMany(cardSeed))
  .then(data => {
    console.log(data.result.n + " cards inserted!");
    console.log(data.insertedIds);
    for (let key in data.insertedIds) {
      gameSeed.cardArray.push(data.insertedIds[key]);
    }
    db.Game
      .find({})
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
