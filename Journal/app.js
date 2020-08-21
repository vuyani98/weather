require('./api/data/database')
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./api/routes');
//Set running port
app.set('port', 3000);

//Middleware printing all requests to the main page
app.use('/', function(req, res, next){
    console.log(req.method, req.url);
    next();
})

//Middleware serving static folders
app.use(express.static(path.join(__dirname, '/public')));

//Middleware for post requests
app.use(express.urlencoded({extended : false}));

//Api routing
app.use('/api', routes);

//listening to requests on port 3000
var server = app.listen(app.get('port'), function(){
    var port = server.address().port;
    console.log('Connected to port ' + port);
})