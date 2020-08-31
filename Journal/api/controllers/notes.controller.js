var mongoose = require('mongoose');
var User = mongoose.model('User')


module.exports.newJournal = function(req, res){

  //finding user in db
  User
  .findOne({username : req.body.user})
  .select('journals')
  .exec( function(err, doc){

    if(err){
        console.log(err)
        res
          .status(500)
          .json(err)
    }

    //creating a journal in the user's journals document
    else if (doc){
        createJournal(req, res, doc);
    }
  });
};

//Journal creation function
var createJournal = function(req, res, userAcc){

  var heading = req.body.heading;
  var content = req.body.content;
  var author = req.body.user;
  var dateCreated = new Date();

  userAcc.journals.push({
    heading : heading,
    author : author,
    content : content,
    date : dateCreated
  });

  //Saving created journal document
  userAcc.save( function (err, updatedAcc){

    if(err){
      console.log(err);
      res
        .status(400)
        .json(err)
    }

    else{
      console.log('Journal entry made');
      res
        .status(201)
        .json(updatedAcc.journals);
    }
  });
}

//Function getting all journal documents from database
module.exports.getAllJournals = function(req, res){

  username = req.body.user;
  console.log("Submitted by: " + req.body.user);

  //find user's journals document in db
  User
    .findOne({username : username})
    .select('journals')
    .exec( function(err, doc){

      if (err){
        console.log(err);
        res
          .status(500)
          .json(err)
      }

      if (!doc){
        console.log('Document not found');
        res
          .status(404)
          .json({})
      }

      else{
    
        console.log('Got the journals');
        res
          .status(200)
          .json(doc);
      }

    })
}

//Finding users and getting the journals
module.exports.getJournal = function(req, res){
    user = req.body.user;
    id = req.params.id;
  
    //get the user documents first
    User
      .findOne({username : user})
      .exec( function(err, doc){

        if(err){
          console.log(err);
          res
            .status(500)
            .json(err)
        }

        if(!doc){
          console.log('user not found')
          res
            .status(404)
            .json({userNotFound : true})
        }

        if (doc){
          var i = 0;

          //iterate through document to find the journal 
          while(i < doc.journals.length){

            if (doc.journals[i]._id == req.params.id){
              res
                .status(200)
                .json(doc.journals[i]);

              break;
            }

            else {
               i++;
            }
          }
        }
      });

}

