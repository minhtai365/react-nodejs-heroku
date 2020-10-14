var express = require('express');
var router = express.Router();

var Imgslide = require('../models/imgslide');

//get type
router.get('/', (req, res, next) => {
    Imgslide.find((err, dt) => {
      res.send(dt)
    })
  })
  //create types
  router.post('/add', (req, res, next) => {
    if (req.body._id !== '') {
      Imgslide.updateOne({ _id: req.body._id }, [
        {
          $set: {
            'imgslide': req.body.urlimg
          }
        }
      ])
        .then(ress => {
          res.send('edit ok');
        })
        .catch(err => {
          res.send(err);
        })
    }
    else {
      var now = new Date;
      var nowlc = new Date().toLocaleString();
      Imgslide.create({
        imgslide: req.body.urlimg,
        created: now,
        createdlc: nowlc
      })
        .then(cre => {
          res.send('create ok');
        })
        .catch(err => {
          res.send('fail');
        });
    }
  });
  //end types
module.exports = router;