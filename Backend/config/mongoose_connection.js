const mongoose = require('mongoose');
require('dotenv').config();
const debug = require('debug')("development:mongoose");

mongoose
  .connect(`${process.env.MONGODB_URI}/starwayCollections`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

module.exports = mongoose.connection;