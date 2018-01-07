'use strict';

todoApp.controller('UserController', ['$rootScope', '$scope', '$state', '$http', '$localStorage', 'Constants', 'UserService',
    function ($rootScope, $scope, $state, $http, $localStorage, Constants, UserService) {
		$scope.model = {
			'name': '',
			'username': '',
			'email': '',
			'password': '',
			'confirm_password': ''
		};
		$scope.errorMessage = "";
		$scope.nameError = "";
		$scope.usernameError = "";
		$scope.emailError = "";
		$scope.passwordError = "";
		$scope.confirmPasswordError = "";
		
		var loggedIn = function (loggedUser) {
			$localStorage.loggedUser = loggedUser;
			$rootScope.$broadcast("login");
			var redirectTo = Constants.states.myToDo;
			if($localStorage.redirectAfterLogging){
				redirectTo = $localStorage.redirectAfterLogging;
				$localStorage.redirectAfterLogging = null;
			}
			$state.go(redirectTo);
		};
		
		$scope.goToCreate = function() {
			$state.go(Constants.states.createUser);
		};
		
		$scope.goToLogin = function() {
			$state.go(Constants.states.login);
		};
		
		$scope.login = function() {
			$scope.errorMessage = "";
			$scope.usernameError = "";
			$scope.passwordError = "";
			// Validate
			if($scope.model.username === ''){
				$scope.usernameError = "Username cannot be blank.";
				return false;
			}
			if($scope.model.password === ''){
				$scope.passwordError = "Password cannot be blank.";
				return false;
			}
			// Create user on server
			UserService.login($scope.model).then(
				function(response){
					console.log(response.data);
					if(response.data.errorCode){
						$scope.errorMessage = response.data.errorMessage;
					}else{
						loggedIn(response.data.user);
					}
				}, 
				function(failedReponse){
					console.log(failedReponse);
				}
			);
		};
		
		$scope.create = function() {
			$scope.errorMessage = "";
			$scope.nameError = "";
			$scope.usernameError = "";
			$scope.emailError = "";
			$scope.passwordError = "";
			$scope.confirmPasswordError = "";
			// Validate
			if($scope.model.name === ''){
				$scope.nameError = "Name cannot be blank.";
				return false;
			}
			if($scope.model.username === ''){
				$scope.usernameError = "Username cannot be blank.";
				return false;
			}
			if($scope.model.email === ''){
				$scope.emailError = "Email cannot be blank.";
				return false;
			}
			if($scope.model.password === ''){
				$scope.passwordError = "Password cannot be blank.";
				return false;
			}
			if($scope.model.password !== $scope.model.confirm_password){
				$scope.confirmPasswordError = "Confirm password is not matched.";
				return false;
			}
			// Create user on server
			UserService.create($scope.model).then(
				function(response){
					console.log(response.data);
					if(response.data.errorCode){
						$scope.errorMessage = response.data.errorMessage;
					}else{
						loggedIn(response.data.user);
					}
				}, 
				function(failedReponse){
					console.log(failedReponse);
				}
			);
		};
    }
]
);