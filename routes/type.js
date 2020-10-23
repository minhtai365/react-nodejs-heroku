var express = require('express');
var router = express.Router();

var Type = require('../models/type');

//get type
router.get('/', (req, res, next) => {
    Type.find((err, dt) => {
      res.send(dt)
    })
  })
  //create types
  router.post('/add', (req, res, next) => {
    if (req.body._id !== '') {
      Type.updateOne({ _id: req.body._id }, [
        {
          $set: {
            'typename': req.body.typename
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
      Type.create({
        typename: req.body.typename,
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