const mongoose = require('mongoose');
var Schema= mongoose.Schema;
var imgslideSchema = Schema({
    imgslide: { type: String, required: true },
    created: { type: Date, required: true },
    createdlc:{type:String,required:true},
});
module.exports = mongoose.model('imgslide', imgslideSchema);