
//import hàm thư viện
const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
//Đối với database dùng compass
const local = "mongodb://localhost:27017/PhwnamMart"
//Đối với database dùng atlas
const atlas = "mongodb+srv://namnpph35329:NamiiU2209@phwnam.z1hqzad.mongodb.net/?retryWrites=true&w=majority&appName=Phwnam"

const connect = async() => {
    try {
        await mongoose.connect(local,{
            
        })
        console.log('connect success');
    } catch (error) {
        console.log(error);
        console.log('connect fail');
    }
}
module.exports = {connect}