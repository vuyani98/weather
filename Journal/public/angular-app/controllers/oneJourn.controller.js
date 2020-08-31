angular.module('journal').controller('viewJourn', viewJourn);

function viewJourn ($http, $routeParams){
    var vm = this;

    var id = $routeParams.id;

    $http.get('/api/myNotes/' + id).then( function(response){

        if (response.status === 200){
            vm.title = response.data.heading;
            vm.content = response.data.content;
            vm.error = null;
        }

        else if(response.status === 404){
            vm.error = "User not found";
        }
    }).catch( function(error){
        console.log(error);
    });
}