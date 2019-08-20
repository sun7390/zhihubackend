var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('config-lite')(__dirname)
var chalk = require('chalk')
var history = require('connect-history-api-fallback');
var db = require('./mongodb/db')

var usersRouter = require('./routes/users');
var tabRouter = require('./routes/tab');
var tabImage = require('./routes/tabImage')
var twitter = require('./routes/twitter')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.all('*',(req,res,next) => {
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','Content-Type,Content-Length,Accept,X-Requested-with');
  res.header('Access-Control-Allow-Methods','PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Max-Age',600);
  res.header('X-Power-By','3.2.1');
  if(req.method === 'OPTIONS'){
    res.sendStatus(200)
  }else{
    next()
  }
})

app.use('/users', usersRouter);
app.use('/tab', tabRouter);
app.use('/tabImage',tabImage)
app.use('/twitter',twitter)

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
});
app.use(history());
app.listen(config.port, () => {
  console.log(
		chalk.green(`成功监听端口：${config.port}`)
  )
})


