'use strict';

todoApp.service('UserService',
    ['$http', '$localStorage',
        function ($http, $localStorage) {
            this.create = function (userAttributes) {
                return $http.post('/api/user/create', userAttributes);
            };
			this.login = function (userAttributes) {
                return $http.post('/api/login', userAttributes);
            };
			this.logout = function () {
                return $http.post('/api/logout', {id: $localStorage.loggedUser.id});
            };
        }
    ]
);
