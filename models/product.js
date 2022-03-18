const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    category: String,
    stock: Number,
    available: Boolean,
    owner: { type: Schema.Types.ObjectId, ref: 'user' }
});

productSchema.virtual('taxes').get(function () {
    return Math.round(this.price * 0.21);
});

productSchema.statics.activos = function () {
    return this.model('product').find({ available: true });
}

productSchema.methods.mismaCategoria = function () {
    return this.model('product').find({ category: this.category });
}

module.exports = mongoose.model('product', productSchema);