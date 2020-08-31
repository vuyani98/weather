angular.module('journal').controller('journCtrl', journCtrl);

function journCtrl($window, $http, authFactory){
    var vm = this;
    
    //Requesting journals
    $http.get('/api/myNotes/').then(function(response){
        vm.journals = response.data.journals;
    }).catch( function(error){
        console.log(error);
    });    
}