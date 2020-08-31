angular.module('journal').directive('navDir', navDir);

function navDir (){
    return {
        restrict : 'E',
        templateUrl : 'angular-app/directives/nav/navDir.html',
        bindToController : true,
        controller : logInCtrl,
        controllerAs :'VM'
    }
}