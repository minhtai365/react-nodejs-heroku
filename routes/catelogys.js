var express = require('express');
var router = express.Router();


var Catelogies = require('../models/Catelogies');

//get catelogy
router.get('/', (req, res, next) => {
    Catelogies.find((err, dt) => {
      res.send(dt)
    })
  })
  //create catelogy
  router.post('/add', (req, res, next) => {
    if (req.body._id !== '') {
      Catelogies.updateOne({ _id: req.body._id }, [{
        $set: {
          "typeid": req.body.typeid,
          "catelogy": req.body.catelogy
        }
      }])
        .then(ress => {
          res.send("edit ok")
        })
        .catch(err => {
          res.send(err)
        })
    }
    else {
      var now = new Date;
      var nowlc = new Date().toLocaleString();
      Catelogies.create({
        catelogy: req.body.catelogy,
        typeid: req.body.typeid,
        created: now,
        createdlc: nowlc
      })
        .then(resp => {
          res.send('create ok');
        })
        .catch(err => {
          res.send(err);
        })
    }
  })
  
module.exports = router;