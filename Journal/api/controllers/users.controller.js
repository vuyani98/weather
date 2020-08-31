var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

//Function controlling registration
module.exports.register = function(req, res){

    var username = req.body.username;
    var name = req.body.name || null;
    var password = req.body.password;

    //creating new user
    User
       .create({
         username : username,
         name : name,
         password : bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        }, function(err, doc){
            
          //error handling
            if(err){
                console.log(err);
                res
                  .status(403)
                  .json(err)
            }

            else{
                console.log("User registered!");
                res
                  .status(201)
                  .json(doc)
            }
        });
}


//function controlling logging in
module.exports.login = function(req, res){

    var username = req.body.username;
    var password = req.body.password;

    //Authenticating user
    User
       .findOne({username : username})
       .exec( function(err, doc){
           
            //error handling
            if(err){
                console.log(err);
                res
                  .status(403)
                  .json(error)
            }
            
            //If user is not in database
            if(!doc){
              console.log('User not found');
              res
                .status(404)
                .json({ userNotFound : true})
            }

            else{
                
                //Comparing password in database with entered password
                if(bcrypt.compareSync(password, doc.password)){
                  console.log("logged in ");
                  var token = jwt.sign({username : username}, 's3cr3t', {expiresIn : 3600})
                  res
                    .status(200)
                    .json({success : true, token : token})
                }
                
                //If password does not match
                else{
                    console.log("Unauthorized");
                    res
                      .status(401)
                      .json({ authFailure : true, auth : null })
                }
                
            }
       })
}

module.exports.authenticate = function(req, res, next){
  
  if(req.headers.authorization){
    
    var token = req.headers.authorization.split(' ')[1];
    
    jwt.verify(token, 's3cr3t', function(err, decoded){

        if(err){
          console.log(err);
          res
            .status(401)
            .json(err)
        }

        else{
          console.log('token is valid');
          req.body.user = decoded.username;
          next();
        }
    })
  }

  else{
    console.log('No authorization header')
    res
      .status(400)
      .send('Token expired')
  }
}