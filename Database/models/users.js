const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const Users = new Scheme({
    email:{type: String, unique:true},
    password:{type: String, maxLength: 255},
    fullName:{type: String},
},{
    timestamps: true
})

module.exports = mongoose.model('user',Users)