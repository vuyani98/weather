var express = require('express');
var mongoose = require('mongoose');
var Quote = mongoose.model('Quote');

module.exports.getQuotes  = function(req, res){

        Quote
            .find()
            .exec( function (err, quotes){

                if(err){
                    console.log(err);
                    res
                      .status(500)
                      .json({quotes : null})
                }

                else if(quotes){
                    console.log("found the quotes");
                    res
                      .status(200)
                      .json(quotes);
                }
            })
}
