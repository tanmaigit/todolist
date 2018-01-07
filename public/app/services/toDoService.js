'use strict';

todoApp.service('ToDoService',
    ['$http',
        function ($http) {
            this.get = function (id, params) {
				id = id ? id : 'all';
				if(params)
					params = {params: params};
                return $http.get('/api/todo/get/' + id, params);
            };
			
			this.update = function (toDoAttributes) {
				// Update
				if(toDoAttributes.id)
					return $http.put('/api/todo/update/' + toDoAttributes.id, toDoAttributes);
				else
					return $http.post('/api/todo/create', toDoAttributes);
            };
			
			this.setStatus = function (toDoAttributes) {
                return $http.put('/api/todo/setStatus', toDoAttributes);
            };
			
			this.setPriority = function (toDoAttributes) {
                return $http.put('/api/todo/setPriority', toDoAttributes);
            };
			
			this.delete = function (id) {
                return $http.delete('/api/todo/' + id);
            };
        }
    ]
);
