var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('config-lite')(__dirname)
var chalk = require('chalk')
var db = require('./mongodb/db')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tabRouter = require('./routes/tab');
var tabImage = require('./routes/tabImage')

var app = express();

app.all('*',(req,res,next) => {
  res.header('Access-Control-Allow-Origin','http://localhost:8080');
  res.header('Access-Control-Allow-Headers','Content-Type,Content-Length,Accept,X-Requested-with');
  res.header('Access-Control-Allow-Methods','PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Credentials','true');
  res.header('X-Power-By','3.2.1');
  if(req.method === 'OPTIONS'){
    res.sendStatus(200)
  }else{
    next()
  }
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tab', tabRouter);
app.use('/tabImage',tabImage)

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

app.listen(config.port, () => {
  console.log(
		chalk.green(`成功监听端口：${config.port}`)
	)
})


