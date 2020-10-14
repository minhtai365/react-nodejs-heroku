var User =require('../models/user');
const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/manager-product', { useNewUrlParser: true, useUnifiedTopology: true });

var users=
[
    new User({
        username:"minhtai",
        password:'290498',
        email:'tranminhtai365'
    }),
    new User({
        username:"minhtai1",
        password:'2904981',
        email:'tranminhtai365'
    }),
    new User({
        username:"minhtai2",
        password:'2904982',
        email:'tranminhtai365'
    }),
    new User({
        username:"minhtai3",
        password:'2904983',
        email:'tranminhtai365'
    }),
    new User({
        username:"minhtai4",
        password:'2904984',
        email:'tranminhtai365'
    }),
    new User({
        username:"minhtai5",
        password:'2904985',
        email:'tranminhtai365'
    })
]
var done=0;
for (var i = 0; i < users.length; i++) {
    users[i].save(function(err,res){
        done++;
        if(done===users.length){
            exit();
        }
        // console.log(res);
    });    
}
function exit(){
    mongoose.disconnect();
}