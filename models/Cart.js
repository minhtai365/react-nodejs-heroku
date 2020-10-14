var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var cartSchema=new Schema({
    userid:{type:Schema.Types.ObjectId,ref:'User'},
    item:[{
    productid:{type:Schema.Types.ObjectId,ref:'Product'},
    qty:{type:Number,required:true},
    price:{type:String,required:true},
    // buy:{type:String,required:true},
    img:{type:String,required:true},
    name:{type:String,required:true},
    typeorder:{type:String,required:true}
    }]
});

// module.exports= Cart.method.addToCart=function(userid,pro){
//     console.log(userid);
//     // let cart=this.item;
//     if(userid!==this.userid){
//         this.userid=userid;
//         this.totalprice=price;
//         this.item.push(pro)
//     }
//     else{
//         console.log('tồn tại');
//     }
// }
module.exports=mongoose.model('Cart',cartSchema);