var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var productSchema=new Schema({
    imgPath:{type:String},
    title:{type:String,required:true},
    color:{type:String},
    size:{type:String},
    type:{type:String},
    price:{type:String,required:true},
    sale:{type:String},
    proNumber:{type:Number,required:true},
    view:{type:Number},
    catelogyid:{
        type : Schema.Types.ObjectId,
        ref:'Catelogies'
    },
    created:{type:Date},
    
    createdlc:{type:String,required:true},
});
module.exports=mongoose.model('Product',productSchema);