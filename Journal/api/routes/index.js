var express =require('express');
var router = express.Router();
var userCtrl = require('../controllers/users.controller');

router
    .route('/register')
    .get()
    .post(userCtrl.register)

router  
    .route('/login')
    .get()
    .post(userCtrl.login)

router 
    .route('/myNotes')
    .get()
    .post()

router
    .route('/new')
    .get()
    .post()

module.exports = router;