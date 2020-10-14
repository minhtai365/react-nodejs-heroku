var express = require('express');
var router = express.Router();
const User = require('../models/user');

var bcrypt = require('bcrypt');
const crypto = require('crypto');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');

process.env.MY_KEY = 'secret';
process.env.USERNAME = 'tranminhtai365@gmail.com';
process.env.PASSWORD = '2268668tmt';

router.get('/', function (req, res, next) {
  User.find().sort('-created').exec((err, dt) => {
    res.send(dt);
  })
})
//khóa user
router.post('/change', (req, res, next) => {
  User.findOne({ _id: req.body.id })
    .then(user => {
      if (user.role === '1') {
        res.send("fail");
      }
      else {
        var st = !user.status;
        User.updateOne({ _id: req.body.id }, [{ $set: { 'status': st } }])
          .then(re => {
            res.send('lock ok');
          })
          .catch(err => {

            res.send('fail');
          })
      }
    })
    .catch(err => {
      res.send('fail');
    })
})
//set info user
router.post('/setinfo', (req, res, next) => {
  const { id, phone, cmnd, address, quan, tp } = req.body;
  User.updateOne({ _id: id }, [
    {
      $set: {
        'cmnd': cmnd,
        'phone': phone,
        'address': address,
        'quan': quan,
        'tp': tp
      }
    }
  ])
    .then(re => {
      res.status(200).json({ mess: 'ok' })
    })
})
//đăng ký
router.post('/register', (req, res) => {
  var now = new Date();
  var nowlc = new Date().toLocaleString()
  const userdt = {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    role: "0",
    status: true,
    created: now,
    createdlc: nowlc,
  }
  User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userdt.password = hash;
          User.create(userdt)
            .then(user => {
              res.send(user.email)
            })
            .catch(err => {
              res.send('err ' + err)
            })

        })
      } else {
        res.send('Username hoặc email đã tồn tại');
      }

    })
    .catch(err => {
      res.send('err ' + err)
    })
})
router.post('/login', function (req, res, next) {
  var username = req.body.username, password = req.body.password;
  console.log(password);
  User.findOne({
    $or: [{ email: username }, { username: username }]
  })
    .then(user => {
      console.log(user);
      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          res.send(user);
        } else {
          res.send('fail')
        }
      } else {
        res.send('fail')
      }
    })
    .catch(err => {
      res.send('fail')
    })
})
router.post('/getpass', function (req, res, next) {
  var email = req.body.email
  // console.log(email);
  const token = crypto.randomBytes(3).toString('hex');
  console.log(token);
  User.updateOne({ email:email }, [{
    $set: {
      "passtoken": token
    }
  }])
  .then(res=>{
    console.log(res);
  })

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.USERNAME,
      pass: process.env.PASSWORD
    },

  });
  var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
    from: 'Minh Tài',
    to: email,
    subject: 'Reset password Minh Tài',
    text: 'Thông báo lấy lại mật khẩu ' + req.body.email,
    html: '<p> Thông báo lấy lại mật khẩu </b><ul><li>Email:' + req.body.email + '</li><li>Mã xác nhận:' + token + '</li></ul>'
  }
  transporter.sendMail(mainOptions, function (err, info) {
    if (err) {
      console.log('Looix' + err);
      // res.redirect('/');
    } else {
      console.log('Message sent: ' + info.response);
      res.redirect('/');
    }
  });
})
router.post('/resetpass', function (req, res, next) {
  var email = req.body.email;
  var token=req.body.token;
  User.findOne({ email:email,passtoken:token})
  .exec((err,user)=>{
    if(!err&&user){
      user.password=bcrypt.hashSync(token,10);
      user.save(err=>{
        if(err)
        res.status(400).json({mess:'Lỗi'})
        else{
          res.status(200).json({mess:'Thành công'})
        }
      })
    }
    else{
      res.status(400).json({mess:'Lỗi'})
    }
  })
  .catch(re=>{
    res.status(400).json({mess:'Lỗi'})
  })
})
router.post('/changepass',(req,res)=>{
  const {pass,newpass,id}=req.body;
  console.log(newpass);
  User.findOne({_id:id})
  .exec((err,user)=>{
    if(!err && user){
      if (bcrypt.compareSync(pass, user.password)) {
        user.password=bcrypt.hashSync(newpass,10);
        user.save(err=>{
          if(err)
          res.status(400).json({mess:'Lỗi'})
          else{
            res.status(200).json({mess:'Thành công'})
          }
        })
      }
      else{
    res.status(400).json({mess:'Mật khẩu không đúng'})
      }
    }
  })

})
//end user//////////////////////////////////////////////////////////////////////////

module.exports = router