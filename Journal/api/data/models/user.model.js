var mongoose = require('mongoose');

var journalSchema = new mongoose.Schema({

    author : {
                type     : String,
                required : true,
             },

    content : {
                 type     : String,
                 required : true
              },
              
    heading : {
                 type      : String,
                 required  : true,
                
              },
    date    : {
                  type     : String,
                  required : true 
               }         

})

var userSchema = new mongoose.Schema({

    username : {
                  type      : String,
                  unique    : true,
                  required  : true
                },
    
    password : {
                    type      : String,
                    required  : true,
                    minlength : 8
                },           
    
    journals : [ journalSchema ]           

})


mongoose.model('User', userSchema, 'users');