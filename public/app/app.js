'use strict';

var todoApp = angular.module('todoApp', ['ui.router', 'ngStorage']);

todoApp.config(function($stateProvider, $urlRouterProvider, Constants) {

    $urlRouterProvider.otherwise('/todo');

    $stateProvider
        .state(Constants.states.myToDo, {
            url: '/todo',
			controller: 'ToDoController',
            templateUrl: '/app/views/toDoList.html'
        })
		.state(Constants.states.login, {
            url: '/login',
			controller: 'UserController',
            templateUrl: '/app/views/login.html'
        })
		.state(Constants.states.createUser, {
            url: '/user/create',
			controller: 'UserController',
            templateUrl: '/app/views/createUser.html'
        })
		.state(Constants.states.createToDo, {
            url: '/todo/create',
			controller: 'ToDoController',
            templateUrl: '/app/views/createToDo.html'
        })
		.state(Constants.states.editToDo, {
            url: '/todo/edit/{id}',
			controller: 'ToDoController',
            templateUrl: '/app/views/createToDo.html'
        });
});

todoApp.run(function($rootScope, $state, $localStorage, $http, Constants, UserService) {
	//$localStorage.loggedUser=null;
	// logout: clear localStorage
	$rootScope.$on("logout", function(){
		UserService.logout().then(
			function(response){
				$localStorage.redirectAfterLogging = null;
				$localStorage.loggedUser = null;
				$state.go(Constants.states.login);
			}
		);
	});

	$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams, options){
			// if user is logged in
			if ($localStorage.loggedUser) {
				$http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.loggedUser.api_token;
			}
			// redirect to login page if user is not logged in
			if (!$localStorage.loggedUser && [Constants.states.login, Constants.states.createUser].indexOf(toState.name) === -1) {
				event.preventDefault();
				$localStorage.redirectAfterLogging = toState.name;
				$state.go(Constants.states.login);
			}
			
			// redirect to home page if user is logged in
			if ($localStorage.loggedUser && [Constants.states.login, Constants.states.createUser].indexOf(toState.name) !== -1) {
				event.preventDefault();
				$state.go(Constants.states.myToDo);
			}
		}
	);
});