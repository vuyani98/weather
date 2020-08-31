angular.module('journal').controller('logInCtrl', logInCtrl);

function logInCtrl ($http, $window, $location, authFactory){
    var vm = this;

    //Checking for successful registration message
    if (authFactory.regMessage){
        vm.message = "Registration successful! Please log in";
    }
    

    //function checks if user is logged in
    vm.isLoggedIn = function(){
        
        if (authFactory.isLoggedIn){
            return true;
        }

        else {
            return false;
        }
    } 

    // Log In function
    vm.logIn = function(){
        vm.error = null;

        var user = {
            username : vm.username,
            password : vm.password
        };

        if (!vm.username || !vm.password){
            vm.error = "Enter username and password to log in";
        }

        else{
                $http.post('/api/login', user).then( function(response){
                
                //Checking if password is authentic
                if(response.data.authFailure){
                    vm.authError = "Incorrect pasword";
                }

                //Checking if user is in database
                if (response.data.userNotFound){
                    vm.error = "User not found";
                }

                //If username and password are authentic
                if (response.data.success){
                    $window.sessionStorage.token = response.data.token;
                    authFactory.isLoggedIn = true;
                    vm.error = null;
                    authFactory.authError = null;
                    $location.path('/');
                }
            }).catch(function(error){
                console.log(error);
            });
        }
    };

    //log Out function clears session 
    vm.logOut = function(){
        authFactory.isLoggedIn = false;
        delete $window.sessionStorage.token;
        $location.path('/login');
    };

}