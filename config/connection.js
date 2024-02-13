/** Setup the Mongoose connection **/
const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;
console.log(process.env.DB_URL);
mongoose.connect(DB_URL)

module.exports = mongoose.connection;