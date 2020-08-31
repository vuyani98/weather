var mongoose = require('mongoose');

var quoteSchema = new mongoose.Schema({
    
    author : String,
    quote : String
});


mongoose.model('Quote', quoteSchema, 'quotes');