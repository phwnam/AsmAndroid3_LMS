var express = require('express');
var router = express.Router();

//Thêm model
const Users = require('../models/users');
const Categories = require('../models/categories');
const Products = require('../models/products');
const Carts = require('../models/carts');


//Api thêm user
router.post('/add-user',async (req,res) => {
    try {
        const data = req.body;//Lấy dữ liệu từ body
        const newUser = new Users({
            email: data.email,
            password: data.password,
            fullName: data.fullName

        });
        const result = await newUser.save();
        if(result){
            res.json({
                "status": 200,
                "messenger": "Thêm thành công",
                "data": result
            })
        }else {
            //Nếu thêm không thành công result null, thông báo không thành công
            res.json({
                "status": 400,
                "messenger": "Lỗi, Thêm không thành công",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
});

router.get('/get-list-user',async(req,res) => {
    try {
        const data = await Users.find();
        if(data){
            //Trả về danh sách
            res.json({
                "status":200,
                "messenger": "Thành công",
                "data": data
            })
        }else{
            //Thêm không thành công
            res.json({
                "status": 400,
                messenger:"Lỗi, không thành công",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
});

router.put('/update-user-by-id/:id', async (req, res) => {
    try {
        const {id} =req.params
        const data = req.body; //Lấy dữ liệu từ body
        const updateUser = await Users.findById(id)
        let result = null;
        if(updateUser){
            updateUser.email = data.email ?? updateUser.email,
            updateUser.password = data.password  ?? updateUser.password,
            updateUser.fullName = data.fullName ?? updateUser.fullName,
            
            result = await updateUser.save();
        }

        // tạo 1 đối tượng mới
        // thêm vào database
        if (result) {
            //Nếu thêm thành công result !null trả về dữ liệu
            res.json({
                "status": 200,
                "messenger": "Cập nhật thành công",
                "data": result
            })
        } else {
            //Nếu thêm không thành công result null, thông báo không thành công
            res.json({
                "status": 400,
                "messenger": "Lỗi, Cập nhật không thành công",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
});

router.delete('/delete-user-by-id/:id',async(req,res) => {
    try {
        const {id} = req.params
        const result = await Users.findByIdAndDelete(id);
        if(result){
            // xoá thành công trả về thông tin item đã xoá
            res.json({
                "status" :200,
                "messenger": "Xoá thành công",
                "data": result
            })
        }else{
            res.json({
                "status": 400,
                "messenger": "Lỗi, xoá không thành công",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
});

////////////////////////////////////////CATEGORY///////////////////////////////////////////////////////

router.get('/get-list-category',async(req,res) => {
    try {
        const data = await Categories.find();
        if(data){
            //Trả về danh sách
            res.json({
                "status":200,
                "messenger": "Thành công",
                "data": data
            })
        }else{
            //Thêm không thành công
            res.json({
                "status": 400,
                messenger:"Lỗi, không thành công",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
});

router.post('/add-category',async(req,res) => {
    try {
        const data = req.body;
        const newcategory = new Categories({
            name: data.name,
            
        }); //Tạo 1 đối tượng mới
        const result = await newcategory.save();//Thêm vào database
        if (result) {
            //Nếu thêm thành công result !null trả về dữ liệu
            res.json({
                "status": 200,
                "messenger": "Thêm thành công",
                "data": result
            })
        } else {
            //Nếu thêm không thành công result null, thông báo không thành công
            res.json({
                "status": 400,
                "messenger": "Lỗi, Thêm không thành công",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
});

router.put('/update-category-by-id/:id', async (req, res) => {
    try {
        const {id} =req.params
        const data = req.body; //Lấy dữ liệu từ body
        const updateCategory = await Categories.findById(id)
        let result = null;
        if(updateCategory){
            updateCategory.name = data.name ?? updateCategory.name,
            result = await updateCategory.save();
        }

        // tạo 1 đối tượng mới
        // thêm vào database
        if (result) {
            //Nếu thêm thành công result !null trả về dữ liệu
            res.json({
                "status": 200,
                "messenger": "Cập nhật thành công",
                "data": result
            })
        } else {
            //Nếu thêm không thành công result null, thông báo không thành công
            res.json({
                "status": 400,
                "messenger": "Lỗi, Cập nhật không thành công",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
});

router.delete('/delete-category-by-id/:id',async(req,res) => {
    try {
        const {id} = req.params
        const result = await Categories.findByIdAndDelete(id);
        if(result){
            // xoá thành công trả về thông tin item đã xoá
            res.json({
                "status" :200,
                "messenger": "Xoá thành công",
                "data": result
            })
        }else{
            res.json({
                "status": 400,
                "messenger": "Lỗi, xoá không thành công",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
});

////////////////////////////////////////////////PRODUCT//////////////////////////////////////////////////////////////

router.get('/get-list-product',async (req,res) => {
    try {
        //Lấy danh sách theo thứ tự distributors mới nhất
        const data = await Products.find().sort({createdAt: -1});
        if(data){
            //Trả về danh sách
            res.json({
                "status":200,
                "messenger": "Thành công",
                "data": data
            })
        }else{
            //Thêm không thành công
            res.json({
                "status": 400,
                messenger:"Lỗi, không thành công",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
});

router.get('/get-product-by-id/:id', async (req, res) => {
    try {
        const { id } = req.params; // Lấy ID từ params
        const product = await Products.findById(id); // Tìm sản phẩm trong database dựa trên ID
        
        if (product) {
            // Nếu sản phẩm tồn tại, trả về thông tin sản phẩm
            res.json({
                status: 200,
                messenger: "Lấy thông tin sản phẩm thành công",
                data: product
            });
        } else {
            // Nếu không tìm thấy sản phẩm, trả về thông báo lỗi
            res.json({
                status: 404,
                messenger: "Không tìm thấy sản phẩm",
                data: null
            });
        }
    } catch (error) {
        // Xử lý lỗi nếu có
        console.log(error);
        res.status(500).json({
            status: 500,
            messenger: "Lỗi server",
            data: null
        });
    }
});

router.post('/add-product', async (req, res) => {
    try {
        const data = req.body;//Lấy dữ liệu từ body
        const newproduct = new Products({
            name: data.name,
            quantity: data.quantity,
            price: data.price,
            status: data.status,
            image: data.image,
            description: data.description,
            id_category: data.id_category,
            
        }); //Tạo 1 đối tượng mới
        const result = await newproduct.save();//Thêm vào database
        if (result) {
            //Nếu thêm thành công result !null trả về dữ liệu
            res.json({
                "status": 200,
                "messenger": "Thêm thành công",
                "data": result
            })
        } else {
            //Nếu thêm không thành công result null, thông báo không thành công
            res.json({
                "status": 400,
                "messenger": "Lỗi, Thêm không thành công",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
});

router.put('/update-product-by-id/:id', async (req, res) => {
    try {
        const {id} =req.params
        const data = req.body;//Lấy dữ liệu từ body
        const updateProduct = await Products.findById(id)
        let result = null;
        if(updateProduct){
            updateProduct.name = data.name ?? updateProduct.name,
            updateProduct.quantity = data.quantity  ?? updateProduct.quantity,
            updateProduct.price = data.price  ?? updateProduct.price,
            updateProduct.status = data.status  ?? updateProduct.status,
            updateProduct.image = data.image  ?? updateProduct.image,
            updateProduct.description = data.description  ?? updateProduct.description,
            updateProduct.id_category = data.id_category  ?? updateProduct.id_category,
            
            result = await updateProduct.save();
        }    
        if (result) {
            //Nếu thêm thành công result !null trả về dữ liệu
            res.json({
                "status": 200,
                "messenger": "Cập nhật thành công",
                "data": result
            })
        } else {
            //Nếu thêm không thành công result null, thông báo không thành công
            res.json({
                "status": 400,
                "messenger": "Lỗi, Cập nhật không thành công",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
});

router.delete('/delete-product-by-id/:id',async(req,res) => {
    try {
        const {id} = req.params
        const result = await Products.findByIdAndDelete(id);
        if(result){
            // xoá thành công trả về thông tin item đã xoá
            res.json({
                "status" :200,
                "messenger": "Xoá thành công",
                "data": result
            })
        }else{
            res.json({
                "status": 400,
                "messenger": "Lỗi, xoá không thành công",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
});
//////////////////////////////////////////////////CART/////////////////////////////////////////////////////

router.get('/get-list-cart',async(req,res) => {
    try {
        const data = await Carts.find();
        if(data){
            //Trả về danh sách
            res.json({
                "status":200,
                "messenger": "Thành công",
                "data": data
            })
        }else{
            //Thêm không thành công
            res.json({
                "status": 400,
                messenger:"Lỗi, không thành công",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
});

router.post('/add-to-cart', async (req, res) => {
    try {
        const data = req.body; // Lấy dữ liệu từ body
        const existingCart = await Carts.findOne({ productId: data.productId });

        if (existingCart) {
            // Nếu sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng
            existingCart.quantity += 1;
            const result = await existingCart.save();
            if (result) {
                res.json({
                    "status": 200,
                    "messenger": "Cập nhật giỏ hàng thành công",
                    "data": result
                });
            } else {
                res.json({
                    "status": 400,
                    "messenger": "Lỗi, cập nhật giỏ hàng không thành công",
                    "data": []
                });
            }
        } else {
            // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm mới
            const newCart = new Carts({
                productId: data.productId,
                name: data.name,
                quantity: data.quantity,
                price: data.price,
                image: data.image
            });
            const result = await newCart.save();
            if (result) {
                res.json({
                    "status": 200,
                    "messenger": "Thêm mới vào giỏ hàng thành công",
                    "data": result
                });
            } else {
                res.json({
                    "status": 400,
                    "messenger": "Lỗi, thêm mới vào giỏ hàng không thành công",
                    "data": []
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            messenger: "Lỗi server",
            data: null
        });
    }
});

// API cập nhật số lượng sản phẩm trong giỏ hàng
router.put('/update-quantity/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;

        // Kiểm tra số lượng phải là số nguyên dương
        if (!Number.isInteger(quantity) || quantity <= 0) {
            return res.status(400).json({ status: 400, messenger: "Số lượng sản phẩm không hợp lệ", data: null });
        }

        let cart = await Carts.findOne({ productId: productId });
        if (!cart) {
            return res.status(404).json({ status: 404, messenger: "Sản phẩm không tồn tại trong giỏ hàng", data: null });
        }

        cart.quantity = quantity; // Cập nhật số lượng sản phẩm

        const updatedCart = await cart.save();

        res.status(200).json({
            status: 200,
            messenger: "Cập nhật số lượng sản phẩm thành công",
            data: updatedCart
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            messenger: "Lỗi server",
            data: null
        });
    }
});



module.exports = router;