var express = require('express');
var router = express.Router();
//connect database
// const mongoose = require('mongoose');
var Product = require('../models/product');
var User = require('../models/user');
var Type = require('../models/type');
var Catelogies = require('../models/Catelogies');
var Imgslide = require('../models/imgslide');

//xóa user
router.post('/remove', (req, res, next) => {
  const id = req.body.id;
  User.deleteOne({ _id: id })
    .then(resp => {
      res.send('remove ok');
    })
    .catch(
      Type.deleteOne({ _id: id })
        .then(resp => {
          deleteCate(id);

          res.send('remove ok');
        })
        .catch(err => {
          deleteCate(id);
          deletePro(id);
          deleteImg(id);
        }
        )
    )
})
function deleteCate(id) {
  Catelogies.deleteOne({ _id: id })
    .then(resp => {
      
      deletePro(id);
      res.send('remove ok');
    })
  Catelogies.deleteMany({ typeid: id })
    .then(resp => {
      res.send('remove ok');
    })
}
function deletePro(id) {
  Product.deleteOne({ _id: id })
    .then(resp => {
      res.send("remove ok");
    })
    Product.deleteMany({ catelogyid: id })
    .then(resp => {
      res.send("remove ok");
    })
}
function deleteImg(id) {
  Imgslide.deleteOne({ _id: id })
    .then(resp => {
      res.send("remove ok");
    })
}
module.exports = router;

// var MogoCl=require('mongodb').MongoClient;
// var url="mongodb://localhost:27017/";
// MogoCl.connect(url,function(err,db){
//   if(err) throw err;
//   var dt=db.db("my-database");
//   dt.collection("user").findOne({roleid:"1"},function(err,res){
//     if(err) throw err;
//     console.log(res.username);
//     dt.close();
//   })
// })
