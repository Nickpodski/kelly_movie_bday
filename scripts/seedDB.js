// node scripts/seedDB.js
const mongoose = require("mongoose");
const db = require("../models");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require('bcryptjs');
const password = process.env.PASSWORD;
const hash = bcrypt.hashSync(password, 10);

mongoose.connect(process.env.MONGODB_URI,
  {
   useUnifiedTopology: true,
   useNewUrlParser: true, 
   useCreateIndex: true, 
   useFindAndModify: false 
 }
 );

const userSeed = [
  {
    username: "Nelly",
    password: hash,
  },
];

db.User.deleteMany({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then((data) => {
    console.log(data.result.n + " user records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });


