var mongoose = require('mongoose');
var User = mongoose.model('User');

//Function controlling registration
module.exports.register = function(req, res){

    var username = req.query.username;
    var name = req.query.name || null;
    var password = req.query.password;

    //creating new user
    User
       .create({
         username : username,
         name : name,
         password : password
        }, function(err, doc){
            
            if(err){
                console.log(err);
                res
                  .status(500)
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

    var username = req.query.username;
    var password = req.query.password;

    //Authenticating user
    User
       .findOne({username : username})
       .exec( function(err, doc){
           
            if(err){
                console.log(err);
                res
                  .status(500)
                  .json(error)
            }

            else{
                
                //Password authentication
                if(password != doc.password){
                    console.log("Unauthorized");
                    res
                      .status(400)
                      .send("Unauthorized")
                }

                else{
                    console.log("logged in ");
                    res
                      .status(200)
                      .json(doc)
                }
                
            }
       })
}