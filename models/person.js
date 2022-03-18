const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
    name: String,
    surname: String,
    age: Number,
    address: String
});

personSchema.virtual('fullName').get(function () {
    return this.name + ' ' + this.surname;
});

// pers.fullName = 'Rodrigo Romero'
personSchema.virtual('fullName').set(function (newValue) {
    const values = newValue.split(' ');
    this.name = values[0];
    this.surname = values[1];
});


module.exports = mongoose.model('person', personSchema);