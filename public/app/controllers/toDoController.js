'use strict';

todoApp.controller('ToDoController', ['$scope', '$state', '$localStorage', 'ToDoService', 'Constants',
    function ($scope, $state, $localStorage, ToDoService, Constants) {
		$scope.errorMessage = "";
		$scope.nameError = "";
		
		var getToDoList = function (){
			var params = {};
			$scope.list = [];
			
			if($scope.search)
				params = $scope.search;
			if($scope.sortParam && $scope.sortParam !== '')
				params.sortBy = $scope.sortParam;
			
			ToDoService.get(null, params).then(
				function(response){
					console.log(response.data);
					if(response.data.errorCode){
						alert(response.data.errorMessage);
					}else{
						$scope.list = response.data.list;
					}
				}, 
				function(failedReponse){
					console.log(failedReponse.data);
				}
			);
		};
		
		$scope.getSortClass = function (sort){
			if(sort === 1)
				return 'glyphicon glyphicon-sort-by-attributes';
			else if(sort === 2)
				return 'glyphicon glyphicon-sort-by-attributes-alt';
			return 'glyphicon glyphicon-sort';
		};
		
		
		$scope.fnSort = function (field){
			if(typeof $scope.sort[field] != 'undefined'){
				// Reset sort
				var oldValue = $scope.sort[field];
				$scope.sort = {
					name: 0,
					description: 0,
					priority: 0,
					status: 0,
					created_at: 0
				};
				$scope.sortParam = field + ',' + (oldValue === 1 ? 'DESC' : 'ASC');
				console.log($scope.sortParam);
				getToDoList();
				// Just update on UI
				$scope.sort[field] = oldValue === 1 ? 2 : 1;
			}
		};
		
		$scope.setStatus = function (todo, newStatus){
			ToDoService.setStatus({id: todo.id, status: newStatus}).then(
				function(response){
					// Update to UI
					todo.status = newStatus;
				}
			);
		};
		
		$scope.getStatus = function (status){
			if(Constants.statuses[status])
				return Constants.statuses[status];
			return '- Select -';
		};
		
		$scope.getStatusClass = function (status){
			if(status === 1)
				return 'btn-primary';
			else if(status === 2)
				return 'btn-warning';
			else if(status === 3)
				return 'btn-success';
			return 'btn-primary';
		};
		
		$scope.getPriority = function (priority){
			if(Constants.priorities[priority])
				return Constants.priorities[priority];
			return '- Select -';
		};
		
		$scope.getPriorityClass = function (priority){
			if(priority === 3)
				return 'btn-danger';
			else if(priority === 2)
				return 'btn-warning';
			else if(priority === 1)
				return 'btn-info';
			return 'btn-primary';
		};
		
		$scope.setPriority = function (todo, newPriority){
			ToDoService.setPriority({id: todo.id, priority: newPriority}).then(
				function(response){
					// Update to UI
					todo.priority = newPriority;
				}
			);
		};
		
		$scope.goToCreate = function (){
			$state.go(Constants.states.createToDo);
		};
		
		$scope.goToList = function (){
			$state.go(Constants.states.myToDo);
		};
		
		$scope.goToEdit = function (id){
			$state.go(Constants.states.editToDo, {id: id});
		};
		
		$scope.fnSearch = function (field, value){
			if(typeof field != 'undefined' && typeof $scope.search[field] != 'undefined')
				$scope.search[field] = value;
			getToDoList();
		};
		
		$scope.update = function (){
			$scope.errorMessage = "";
			$scope.nameError = "";
			// Validate
			if($scope.model.name === ''){
				$scope.nameError = "Name cannot be blank.";
				return false;
			}
			// Create user on server
			ToDoService.update($scope.model).then(
				function(response){
					if(response.data.errorCode){
						$scope.errorMessage = response.data.errorMessage;
					}else{
						$scope.goToList();
					}
				}, 
				function(failedReponse){
					console.log(failedReponse);
				}
			);
		};
		
		$scope.delete = function (todo){
			if(confirm("Are you sure you want to delete this task?") === true){
				ToDoService.delete(todo.id).then(
					function(response){
						var currentIndex = $scope.list.indexOf(todo);
						$scope.list.splice(currentIndex, 1);
					}
				);
			}
		};
		
		// List
		if($state.current.name === Constants.states.myToDo) {
			$scope.search = {'name': '', 'description': '', 'priority': 0, 'status': 0};
			$scope.sortParam = 'created_at,DESC';
			$scope.sort = {
				name: 0,
				description: 0,
				priority: 0,
				status: 0,
				created_at: 2
			};
			getToDoList();
		// Edit
		} else if($state.current.name === Constants.states.editToDo){
			$scope.model = {};
			ToDoService.get($state.params.id).then(
				function(response){
					if(!response.data.todo){
						$scope.goToList();
					}else{
						$scope.model = response.data.todo;
					}
				}, 
				function(failedReponse){
					console.log(failedReponse.data);
					$scope.goToList();
				}
			);
		// Create
		}else{
			$scope.model = {
				'id': null,
				'name': '',
				'description': '',
				'status': null,
				'priority': 2, // medium
				'user_id': $localStorage.loggedUser.id
			};
		}
    }
]
);