var Product = require('../models/product');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/manager-product', { useNewUrlParser: true, useUnifiedTopology: true });
var products = 
 [
    new Product({
        imgPath: 'https://ferosh.vn/storage/images/42240455439aa23182bf604e3b202915/525x787/2469nJzw2X5LttwX12f5mvkSYthKwBnxPxYa6nyF.jpeg',
        title: 'Quần tây âu vàng',
        description: 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris',
        price: '400000',
        sale: '200000',
        proNumber: 10
    }),
    new Product({
        imgPath: 'https://ferosh.vn/uploads/23-07-2019/TUN-1707(1).jpg',
        title: 'Sơ mi buộc dây hồng đậm',
        description: 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris',
        price: '500000',
        sale: '400000',
        proNumber: 10
    }),
    new Product({
        imgPath: 'https://ferosh.vn/storage/images/42240455439aa23182bf604e3b202915/525x787/2469nJzw2X5LttwX12f5mvkSYthKwBnxPxYa6nyF.jpeg',
        title: 'Quần tây âu vàng',
        description: 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris',
        price: '400000',
        sale: '200000',
        proNumber: 10
    }),
    new Product({
        imgPath: 'https://ferosh.vn/uploads/23-07-2019/TUN-1707(1).jpg',
        title: 'Sơ mi buộc dây hồng đậm',
        description: 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris',
        price: '500000',
        sale: '400000',
        proNumber: 10
    }),
    new Product({
        imgPath: 'https://ferosh.vn/storage/images/42240455439aa23182bf604e3b202915/525x787/2469nJzw2X5LttwX12f5mvkSYthKwBnxPxYa6nyF.jpeg',
        title: 'Quần tây âu vàng',
        description: 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris',
        price: '400000',
        sale: '200000',
        proNumber: 10
    }),
    new Product({
        imgPath: 'https://ferosh.vn/uploads/23-07-2019/TUN-1707(1).jpg',
        title: 'Sơ mi buộc dây hồng đậm',
        description: 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris',
        price: '500000',
        sale: '400000',
        proNumber: 10
    })
]
var done=0;
for (var i = 0; i < products.length; i++) {
    products[i].save(function(err,res){
        done++;
        if(done===products.length){
            exit();
        }
        // console.log(res);
    });    
}
function exit(){
    mongoose.disconnect();
}