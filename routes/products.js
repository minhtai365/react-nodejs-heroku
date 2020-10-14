var express = require('express');
var router = express.Router();
const Product = require('../models/product');
router.get('/', function (req, res, next) {
    Product.find().sort('-created').exec((err, dt)=> {
      res.status(200).send(dt);
    });
  })
  router.post('/add', (req, res, next) => {
    if (req.body._id !== '') {
      Product.updateOne({ _id: req.body._id }, [
        {
          $set: {
            "title": req.body.title,
            "price": req.body.price,
            "sale": req.body.sale,
            "proNumber": req.body.proNumber,
            "imgPath": req.body.imgPath,
            "color": req.body.color,
            "size": req.body.size,
            "type": req.body.type,
            // "view": 0,
            "catelogyid": req.body.catelogyid,
          }
        }
      ])
        .then(re => {
          res.send('edit ok');
        })
        .catch(err => {
          res.send('fail');
        })
    } else {
      var now = new Date();
      var nowlc = new Date().toLocaleString();
      var pro = {
        title: req.body.title,
        price: req.body.price,
        sale: req.body.sale,
        proNumber: req.body.proNumber,
        imgPath: req.body.imgPath,
        catelogyid: req.body.catelogyid,
        color: req.body.color,
        size: req.body.size,
        type: req.body.type,
        view: 0,
        created: now,
        createdlc: nowlc
      }
      Product.create(pro)
        .then(re => {
          res.send('create ok');
        })
        .catch(err => {
          res.send(err);
        })
    }
  }
  )
  router.post('/viewitem', (req, res, next) => {
    Product.updateOne({ _id: req.body.id }, { $inc: { view: + 1 } })
      .then(item => {
        res.send(item);
      })
      .catch(err => {
        res.send(err)
      })
  })
  //end product///////////////////////////////////////////////////////
  module.exports=router