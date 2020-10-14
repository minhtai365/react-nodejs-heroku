var express = require('express');
var router = express.Router();
const info = require('../models/info');

router.get('/',(req,res,next)=>{
  info.find({},(err,dt)=>{
    res.send(dt)
  })
})
router.post('/set',(req,res,next)=>{
  console.log('lô');
  const {name,phone,email,vchuyen,dtra,ttoan,address}=req.body;
  info.find((err,dt)=>{
    if(dt.length!==0){
      info.updateOne({},[
        {
          $set:{
            'name':name,
            'phone':phone,
            'email':email,
            'address':address,
            'vchuyen':vchuyen,
            'ttoan':ttoan,
            'dtra':dtra
          }
        }
        ]
      )
      .then(re=>{
        
        res.status(200).json({ mess: 'ok' })
      })
      .catch(er=>{
      })
    }
    else{
      var inf={
        name:name,
        phone:phone,
        email:email,
        address:address,
        vchuyen:vchuyen,
        ttoan:ttoan,
        dtra:dtra
      }
      info.create(inf)
      .then(re=>{
      })
      .catch(e=>{
      })
    }
  })
  
})


module.exports = router;
