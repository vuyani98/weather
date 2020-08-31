angular.module('journal', ['ngRoute']).config( config).run(run)

function config($httpProvider, $routeProvider){

    $httpProvider.interceptors.push('authInterceptor');

    $routeProvider
        .when('/', {
            templateUrl  : 'angular-app/views/home.html',
            controller   : homeCtrl,
            controllerAs : 'vm'
        })
        .when('/myJournals', {
            templateUrl  : 'angular-app/views/journals.html',
            controller   : journCtrl,
            controllerAs : 'vm', 
            access       :  {
                                restricted : true
                            }

        })
        .when('/myJournals/new', {
            templateUrl  : 'angular-app/views/newJourn.html',
            controller   : newJournal,
            controllerAs : 'vm',
            access       : {
                                restricted : true,
                           }
        })
        .when('/myJournals/:id', {
            templateUrl  : 'angular-app/views/journ.html',
            controller   : viewJourn,
            controllerAs : 'vm',
            access       : {
                                restricted : true
                           }
        })

        .when('/register',{
            templateUrl  : 'angular-app/views/Register.html',
            controller   : signInCtrl,
            controllerAs :  'vm'
        })

        .when('/login', {
            templateUrl : 'angular-app/views/login.html',
            controller : logInCtrl,
            controllerAs : 'vm'
        })
        .when('/logout', {
            redirectTo : '/'
        })
        .otherwise ({
            redirectTo : '/'
        })
    }

function run($rootScope, $location, $window, authFactory){

    $rootScope.$on('$routeChangeStart', function( event, nextRoute, currentRoute){
        if(nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !authFactory.isLoggedIn){
            event.preventDefault();
            $location.path('/')
        }
    })
}    
