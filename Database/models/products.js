const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const Products = new Scheme({
    name: {type: String},
    quantity: {type: Number},
    price: {type: Number},
    status: {type: Number}, // status = 1 => còn hàng, 0 => Hết hàng, -1 => Ngừng kinh doanh
    image: {type: String}, // Kiểu dữ liệu danh sách
    description: {type: String},
    id_category: {type: Scheme.Types.ObjectId, ref: 'category'},
},{
    timestamps: true
})
module.exports = mongoose.model('product', Products)

/*
    type: Scheme.Types.ObjectId => Kiểu dữ liệu id của mongodb
    ref: khoá ngoại
*/