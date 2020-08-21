var mongoose =require('mongoose');
var dburl = 'mongodb://localhost:27017/notebook';

var options = {
    useNewUrlParser : true,
    useUnifiedTopology: true
}

mongoose.connect(dburl, options);

mongoose.connection.on('open', function(){
    console.log('Connected to mongodb');
})

mongoose.connection.on('error', function(err){
    console.log(err);
})

mongoose.connection.on('close', function(){
    console.log('Mongodb disconnected !');
});


require('./models/journal.model');
require('./models/user.model');