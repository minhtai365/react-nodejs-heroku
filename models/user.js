var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var userSchema=new Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true},
    name:{type:String,required:true},
    phone:{type:String},
    cmnd:{type:String},
    address:{type:String},
    quan:{type:String},
    tp:{type:String},
    created:{type:Date,required:true},
    createdlc:{type:String,required:true},
    role:{type:String,required:true},
    passtoken:{type:String},
    status:{type:Boolean,required:true}
});
module.exports=mongoose.model('User',userSchema,'users');