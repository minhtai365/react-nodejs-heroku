var mongoose=require('mongoose');
var Schema =mongoose.Schema;
var OrderSchema=new Schema({
    userid:{type:Schema.Types.ObjectId,ref:"User",required:true},
    total:{type:String,required:true},
    date:{type:Date,required:true},
    datelc:{type:String},
    datecom:{type:String},
    dateget:{type:String},
    datecan:{type:String},
    status:{type:Number,required:true},
    item:{type:Array},
    contact:{type:Object,required:true}
})
module.exports=mongoose.model('Order',OrderSchema);