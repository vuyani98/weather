var mongoose = require('mongoose');
var Journal = mongoose.model('Journal');


module.exports.newJournal = function(req, res){
    
  var heading = req.query.heading;
  var content = req.query.content;
  var author = req.query.user;
  var date = Date.now();
  
  Journal.create({
      author  : author,
      heading : heading,
      content : content,
      date    :  date
  }, function(err, doc){

    if(err){
        console.log(err)
        res
          .status(500)
          .json(err)
    }

    else{
        console.log('Journal is in');
        res
          .status(201)
          .json(doc)
    }
  });
};

module.exports.getJournal = function(req, res){
    
    return;
};