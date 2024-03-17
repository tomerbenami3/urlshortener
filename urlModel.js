const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    short_url: {
        type: String,
        required: [true, "URL doesn't exist."],
        unique: true
    },
    long_url: {
        type: String,
        unique: true
    }
})
const UrlInMongo = mongoose.model('Url', urlSchema);

module.exports = UrlInMongo;