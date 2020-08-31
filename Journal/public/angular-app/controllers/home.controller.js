angular.module('journal').controller('homeCtrl', homeCtrl);


function homeCtrl($http){

    var vm = this;

    $http.get('api/quotes').then( function(response){
        console.log(response);
        if(response.status === 200){
            vm.index = Math.floor(Math.random()*48);
            vm.quotes = response.data; 
            vm.quote = vm.quotes[vm.index];
        }

        else{
            vm.quote = {
                author : "ALFRED NORTH WHITEHEAD.",
                quote  : " The art of progress is to preserve order amid change and to preserve change amid order"
            }
        }
        
    })
}