/** Setup the Mongoose connection **/
const mongoose = require('mongoose');
const ATLAS_URL = process.env.ATLAS_URL;

mongoose.connect('DB_URL')

module.exports = mongoose.connection;