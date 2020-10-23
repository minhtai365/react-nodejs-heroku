var express = require('express');
var router = express.Router();

var Cart = require('../models/Cart');
const Product = require('../models/product');

// start cart
router.get('/', (req, res, next) => {
    Cart.find().sort().exec((err, dt)=> {
      res.send(dt)
    })
  })
  router.post('/', (req, res, next) => {
    Cart.find({userid:req.body.id})
    .then(ress=>res.status(200).send(ress[0]));
    
  })
  //thêm
  router.post('/add', (req, res, next) => {
    var item = {
      productid: req.body.product._id,
      qty: 1,
      img: req.body.product.imgPath,
      price: req.body.product.sale * 0.7,
      name: req.body.product.title,
      typeorder: '0.7'
    }
    Cart.findOne({ userid: req.body.userid }).then(u => {
      if (u === null) {//user chưa có gì trong giỏ
        var cart = new Cart({
          userid: req.body.userid
        });
        cart.item.push(item)
        Cart.create(cart)
          .then(cre => {
            res.send('Thành công');
          })
      }
      else {
        //tìm kiếm sp thêm có trong giỏ hay chưa
        Cart.findOne({ userid: req.body.userid, 'item.productid': req.body.product._id }).then(p => {
          if (p === null) {//chưa
            Cart.updateOne({ userid: req.body.userid }, { $push: { item: item } })
              .then(ew => {
                res.send("Thành công");
              })
              .catch(e => {
              })
          }
          else {//có
            var count = req.body.product.proNumber;
            Cart.updateOne({
              userid: req.body.userid,
              item: {
                $elemMatch: {
                  productid: req.body.product._id,
                  qty: { $lt: count }
                }
              }
            }, { $inc: { "item.$.qty": +1 } })
              .then(r => {
                if (r.n === 0)
                  res.send("Số lượng tối đa đã có trong giỏ hàng của bạn");
                else
                  res.send("Thêm thành công");
              })
              .catch(err => {
              })
          }
        })
          .catch(err => {
          })
      }
    });
  
  })
  //set giá
  router.post('/setprice', (req, res, next) => {
    Product.findById({ _id: req.body.id }, (err, dt) => {
      var price = parseInt(dt.sale * req.body.price);
      Cart.updateOne({ 'item.productid': req.body.id, userid: req.body.userid },
        { $set: { "item.$.price": price, "item.$.typeorder": req.body.price } })
        .then(r => {
          res.status(200).json({ mess: 'ok' })
        })
        .catch(err => {
  
          res.status(400).json({ mess: 'err' })
        })
  
    })
  })
  //set số lượng
  router.post('/setqty', (req, res, next) => {
      console.log('ok');
    Product.findById({ _id: req.body.productid }, function (err, dt) {
      var max = dt.proNumber;
      if (req.body.num === 1) {
        max = max - 1
      }
      else max = max
      var min = 1;
      if (min + req.body.num === 0) {
        min = 2;
      }
      else min = 1
      Cart.updateOne({
        userid: req.body.userid,
        item: {
          $elemMatch: {
            productid: req.body.productid,
            qty: { $gte: min, $lte: max }
          }
        }
      },
        { $inc: { "item.$.qty": +req.body.num } })
        .then(r => {
          if (r.n === 0)
            res.send("Hết hàng");
          else
            res.send("Thêm thành công");
        })
        .catch(err => {
  
          res.status(400).json({ mess: 'err' })
        })
    });
  })
  //xóa ra khỏi cart
  router.post('/remove', (req, res, next) => {
    var proid = req.body.id;
    var userid = req.body.userid;
    Cart.updateOne({userid: userid }, { $pull: { item: { productid: proid } } })
      .then(ress => {
        res.status(200).json({mess:'ok'})
      })
  })
  // end cart/////////////////////////////////////////
  
  module.exports=router