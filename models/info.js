var mongoose=require('mongoose');
const { model } = require('./product');

// require('mongoose-type-email');
var Schema=mongoose.Schema;
var infoSchema=new Schema({
    phone:{type:String,required:true},
    email:{type:String,required:true},
    // email: [{type: mongoose.SchemaTypes.Email}]
    address:{type:String,required:true},
    name:{type:String,required:true},
    ttoan:{type:String,required:true},
    vchuyen:{type:String,required:true},
    dtra:{type:String,required:true},
})
module.exports=mongoose.model('info',infoSchema);