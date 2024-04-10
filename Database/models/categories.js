const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const Categories = new Scheme({
    name: {type: String},
},{
    timestamps: true
})

module.exports = mongoose.model('categories', Categories)