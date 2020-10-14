const mongoose = require('mongoose');
const Catelogy = require('../models/catelogy');
const Type = require('../models/type');
mongoose.connect('mongodb://localhost:27017/manager-product', { useNewUrlParser: true, useUnifiedTopology: true });
var catelogys = new Catelogy({
    // created:"2020-09-14 07:32:11.315Z",
    typename:"name"
});
catelogys.save();
// mongoose.disconnect();
