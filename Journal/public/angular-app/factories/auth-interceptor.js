
angular.module('journal').factory('authInterceptor', authInterceptor);


function authInterceptor($location, $q, $window, authFactory){

    return{

        request       : request,
        response      : response,
        responseError : responseError
    }

    
    function request(config){

        config.headers = config.headers || {};

        // adding token to authorization header
        if ($window.sessionStorage.token){
            config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
        }

        return config;
    }

    function response(response){

        //Set isLoggedIn property to true if logging in was successful and a token exists
        if (response.status === 200 && $window.sessionStorage.token && !authFactory.isLoggedIn){
            authFactory.isLoggedIn = true;
            
        }

        //Set isLoggedIn property to false if logging in is not authorized
        if(response.status === 401){
            authFactory.isLoggedIn = false;
        }


        return response || $q.when(response);
    }

    //handling log In errors
    function responseError(rejection){

        if(rejection.data.authFailure && rejection.status === 401)
        {
            return rejection;
        }

        else if (rejection.data.userNotFound && rejection.status === 404){

            return rejection;
            
        }
        else if (rejection.status === 401 || rejection.status === 403){
            delete $window.sessionStorage.token;
            authFactory.isLoggedIn = false;
            authFactory.authError = true;
            $location.path('/login')
        }

        return $q.reject(rejection);
    }
}