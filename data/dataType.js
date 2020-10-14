var Type = require('../models/type');
var Catelogy = require('../models/catelogy');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/manager-product', { useNewUrlParser: true, useUnifiedTopology: true });
var typesTp = new Type({
    typename: 'Trang phục'
});
var typesPk = new Type({
    typename: 'Phụ kiện'
});
    // new Catelogy({
    //     catelogy: 'Áo cưới',
        
    // }),
    // new Catelogy({
    //     catelogy: 'Áo dài',
        
    // }),
    // new Catelogy({
    //     catelogy: 'Cổ trang',
        
    // }), new Catelogy({
    //     catelogy: 'Khác',
        
    // })
    // new Catelogy({
    //     catelogy: 'Túi xách',
    //     type: typesPk._id
    // }),
    // new Catelogy({
    //     catelogy: 'Giày',
    //     type: typesPk._id
    // }), new Catelogy({
    //     catelogy: 'Khác',
    //     type: typesPk._id
    // })
// ]
typesPk.save();
typesTp.save();
    

var catelogys = 
    new Catelogy({
        catelogy: 'Đầm dự tiệc',
        typeid:typesPk._id
    })
    catelogys.save();
// mongoose.disconnect();
