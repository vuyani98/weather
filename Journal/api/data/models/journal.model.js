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
                 maxlength : 30
              }
})


mongoose.model('Journal', journalSchema, 'journals');


