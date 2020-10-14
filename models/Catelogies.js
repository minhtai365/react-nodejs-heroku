const mongoose=require('mongoose');

var Schema=mongoose.Schema;
var catelogySchema=new Schema({
    catelogy:{type:String,required:true},
    typeid:{
        type : Schema.Types.ObjectId,
        ref:'Type'
    },
    created:{type:Date,required:true},
    
    createdlc:{type:String,required:true},
})
module.exports=mongoose.model('Catelogies',catelogySchema);