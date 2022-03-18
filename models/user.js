const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'product' }]
});

module.exports = mongoose.model('user', userSchema);