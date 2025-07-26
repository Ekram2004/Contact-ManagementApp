const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    notes: String
});

module.exports = mongoose.model('Contact', contactSchema);