const mongoose = require('mongoose');
const coinSchema = new mongoose.Schema({
    name: String,
    country: String,
    material: String,
    par: Number,
    year: String,
    price: Number
});
module.exports = mongoose.model('Coin', coinSchema);