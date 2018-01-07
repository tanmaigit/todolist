'use strict';

todoApp.controller('HeaderController', ['$rootScope', '$scope', '$localStorage',
    function ($rootScope, $scope, $localStorage) {
		$scope.name = "";
		
		// logout: clear localStorage
		$rootScope.$on("login", function(){
			$scope.name = $localStorage.loggedUser.name;
		});
		
		if($localStorage.loggedUser)
			$scope.name = $localStorage.loggedUser.name;
		
		$scope.logout = function() {
			$scope.name = "";
			$rootScope.$broadcast("logout");
		}
    }
]
);