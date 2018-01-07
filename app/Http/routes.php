<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$app->get('/', function () use ($app) {
    return view('index');
});

$app->group(['prefix' => 'api'], function($app)
{
	$app->post('user/create', 'UserController@create');
	
	$app->post('login', 'UserController@login');
	
	$app->post('logout', 'UserController@logout');
	
	$app->get('todo/get/{id}', 'ToDoController@get');
	
	$app->post('todo/create', 'ToDoController@create');
 
	$app->put('todo/setStatus', 'ToDoController@updateStatus');
	
	$app->put('todo/setPriority', 'ToDoController@updatePriority');
	
	$app->put('todo/update/{id}', 'ToDoController@update');
 	 
	$app->delete('todo/{id}', 'ToDoController@delete');	
});
