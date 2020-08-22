var express =require('express');
var router = express.Router();
var userCtrl = require('../controllers/users.controller');
var noteCtrl = require('../controllers/notes.controller');

router
    .route('/register')
    .post(userCtrl.register)

router  
    .route('/login')
    .post(userCtrl.login)

router 
    .route('/myNotes')
    .get()
    .post()

router
    .route('myNotes/new')
    .post(noteCtrl.newJournal)

module.exports = router;