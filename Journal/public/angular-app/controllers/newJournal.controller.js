angular.module('journal').controller('newJournal', newJournal);

function newJournal($http, $location){
    var vm = this;

    //journal creating function
    vm.createJourn = function (){

        var journ = {
           heading : vm.heading,
           content : vm.content 
        };

        if ( !vm.heading || !vm.content ){
            vm.error = "Please provide title and content before submitting";
            console.log("Contents missing");
        }

        else if(vm.heading && vm.content){

            //Submitting the created journal
            $http.post('/api/myNotes/new', journ).then( function (response){
                vm.error = null;
                vm.message = "Journal entry made!"
            }).catch( function (error){
                console.log(error);
            });
        }
        
    }
}