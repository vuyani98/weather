var express =require('express');
var router = express.Router();
var userCtrl = require('../controllers/users.controller');
var noteCtrl = require('../controllers/notes.controller');
var quotesCtrl = require('../controllers/quotes.controller');


router
    .route('/register')
    .post(userCtrl.register)

router  
    .route('/login')
    .post(userCtrl.login)

router 
    .route('/myNotes')
    .get(userCtrl.authenticate, noteCtrl.getAllJournals)

router
    .route('/myNotes/:id')
    .get(userCtrl.authenticate, noteCtrl.getJournal)    
    

router
    .route('/myNotes/new')
    .post(userCtrl.authenticate, noteCtrl.newJournal)

router
    .route('/quotes')
    .get(quotesCtrl.getQuotes)    

module.exports = router;