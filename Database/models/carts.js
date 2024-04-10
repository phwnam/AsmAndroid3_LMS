const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const Carts = new Scheme({
    productId:{type: String},
    name: {type: String},
    quantity: {type: Number},
    price: {type: Number},
    image: {type: String}, 
},{
    timestamps: true
})
module.exports = mongoose.model('cart', Carts)

/*
    type: Scheme.Types.ObjectId => Kiểu dữ liệu id của mongodb
    ref: khoá ngoại
*/