angular.module('journal').factory('authFactory', authFactory);

function authFactory(){

    return{
        
        auth : auth,
        
    }

    var auth = {
        isLoggedIn : false,
        regMessage : false,
        authError : false
    }

}