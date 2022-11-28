const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_CONNECTION_STRING;

mongoose.connection.once('open', () => {});

mongoose.connection.on('error', (err) => {});

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;
