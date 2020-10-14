var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var infoRouter = require('./routes/info');
const userRouter=require('./routes/user');
const productsRouter=require('./routes/products');
const typesRouter=require('./routes/type');
const cartRouter=require('./routes/cart');
const catelogysRouter=require('./routes/catelogys');
const orderRouter=require('./routes/order');
const imgslideRouter=require('./routes/imgslide');
//connect database
const mongoose = require('mongoose');
mongoose.connect(process.env.DATA_URL_MONGOOSE||'mongodb://localhost:27017/manager-product', { useNewUrlParser: true, useUnifiedTopology: true });
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/info', infoRouter);
app.use('/order', orderRouter);
app.use('/catelogys', catelogysRouter);
app.use('/cart', cartRouter);
app.use('/types', typesRouter);
app.use('/products', productsRouter);
app.use('/imgslide', imgslideRouter);

app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
