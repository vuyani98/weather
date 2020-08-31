angular.module('journal').controller('signInCtrl', signInCtrl);

function signInCtrl($http, $location, authFactory){
  
    var vm = this;
    vm.message = null;

    //Registration function
    vm.register = function (){
        var user = {
            username : vm.username,
            password : vm.confirmedPass
        };

        //Form validation
        if (!vm.username || !vm.password ){
            vm.error="Please enter username and password";
        }

        else if(vm.password !== vm.confirmedPass || !vm.confirmedPass){
            vm.error="Please make sure passwords match";
        }
        
        else{

            //submitting registration form
            $http.post('/api/register', user).then(function(response){
                vm.error = null;
                authFactory.regMessage = true;
                $location.path('/login')
            
        }).catch(function (err){
            console.log(err.data);
            
            //if username already exists
            if (err.data['code'] === 11000){
                vm.error="Username already exists"; 
            }
        });
        }
        

    }    
}