var express = require('express');
var ejs = require('ejs');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');


app.use(session({
    secret:'mysecretapp',
    resave: true,
    saveUninitialized:false
}));

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(__dirname+'/views'));

// Require Route and map with a path :
var index = require('./routes/index');
app.use('/',index);

// catch 404 :
app.use(function(req,res,next){
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

// error handler for 500:
app.use(function(err,req,res,next){
    res.status(err.status || 500 );
    res.send(err.message);
})

app.listen(4321, function(){
    console.log('App is running on port 4321');
});
