var express = require('express');
var router = express.Router();

const Order = require('../models/order');
const Product = require('../models/product');

var Cart = require('../models/Cart');
// start order
//get order
router.get('/', (req, res, next) => {
  var now =new Date();
  Order.find().then(re=>{
    re.forEach(x=>{
      var day=now.getTime()-x.date.getTime();
      // console.log(x.status);
    if(day>86400000 && x.status===1){
      Order.updateOne({_id:x._id},[
        {$set:{'status':0}}
      ])
      .then(re=>{
        console.log(re);
      })


    }
  })
})
  Order.find({}).sort('-date').exec((err, dt) => {
    res.send(dt);
  })
})
router.post('/cancel', (req, res) => {
  
  var now=new Date().toLocaleString();
  Order.updateOne({ _id: req.body.id }, [
    {
      $set: {
        'status': 0,
        'datecan':now
      }
    }
  ])
    .then(re => {
      req.body.item.map(x => {
        Product.updateOne({ _id: x.productid }, { $inc: { proNumber: + x.qty } })
          .then(ress => {
            res.status(200).json({ mess: 'ok' })
          })
      })
    })
})
router.post('/complete', (req, res) => {
  var now=new Date().toLocaleString();
  Order.updateOne({ _id: req.body.id }, [
    {
      $set: {
        'status': 3,
        'datecom':now
      }
    }
  ])
    .then(re => {

      res.status(200).json({ mess: 'ok' });
    })
})

router.post('/confirm', (req, res) => {
  
  var now=new Date().toLocaleString();
  Order.updateOne({ _id: req.body.id },[
    {$set:{
      'status':2,
      dateget:now
    }}
  ]
    //  { $inc: { status: + 1 } }
     )
    .then(re => {
      res.status(200).json({ mess: 'ok' });
    }).catch(er => {
      res.status(400).json({ mess: 'fail' });
    })
})
//add order
router.post('/add', (req, res, next) => {
  const { userid, item, name, phone, address, tp, quan, cmnd, total } = req.body;
  var buy = [];
  var rent = [];
  item.forEach(x => {
    if (x.typeorder === '1') {
      buy.push(x);
    }
    else {
      rent.push(x);
    }
  });
  var con = {
    name: name,
    phone: phone,
    address: address,
    tp: tp,
    quan: quan,
    cmnd: cmnd
  };
  var now =new Date()
  var nowlc =new Date().toLocaleString()
  var ord = new Order({
    userid: userid,
    total: total,
    item: item,
    contact: con,
    status: 1,
    date: now,
    datelc: nowlc
  });

  // console.log(item[0].productid);

  Order.create(ord)
    .then(re => {
      item.map(x => {
        Product.updateOne({ _id: x.productid }, { $inc: { proNumber: - x.qty } })
          .then(re => {
            Cart.findOneAndRemove({ userid: userid })
              .then(re => {
                res.status(200).json({ mess: 'Ok' })
              })
              .catch(er => {
                res.status(400).json({ mess: 'Fail' })
              })
          })
          .catch(er => {
            res.status(400).json({ mess: 'Fail' })
          })
      })
    })
    .catch(e => {
      res.status(400).json({ mess: 'Fail' })
    })
})

module.exports = router;