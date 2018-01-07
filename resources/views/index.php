<html>
  <head>
    <meta charset="utf-8">
    <title>ToDo List</title>
    <link rel="stylesheet" href="/bower_components/bootstrap/dist/css/bootstrap.css" />
	<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="/css/style.css" />
  </head>
  <body ng-app="todoApp">
	<div class="container">
		<div id="header" ng-include="'app/views/header.html'" ng-controller="HeaderController"></div>
		<div id="content" ui-view></div>
	</div>
	<script src="/bower_components/jquery/jquery.js"></script>
    <script src="/bower_components/angular/angular.js"></script>
	<script src="/bower_components/ui-router/release/angular-ui-router.js"></script>
	<script src="/bower_components/ngstorage/ngStorage.min.js"></script>
	<script src="/bower_components/bootstrap/dist/js/bootstrap.js"></script>
	<script src="/app/app.js"></script>
	<script src="/app/constants.js"></script>
	<script src="/app/controllers/headerController.js"></script>
	<script src="/app/controllers/userController.js"></script>
	<script src="/app/controllers/toDoController.js"></script>
	<script src="/app/services/userService.js"></script>
	<script src="/app/services/toDoService.js"></script>
  </body>
</html>