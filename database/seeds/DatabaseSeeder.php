<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		$userId = DB::table('user')->insertGetId([
			'name' => 'Administrator',
			'username' => 'admin',
			'email' => 'admin@gmail.com',
			'password' => Hash::make('admin')
		]);
		DB::table('todo')->insert([
			'name' => 'first task',
			'description' => 'reseacher the laravel/lumen and microservice, setup on local',
			'status' => 3,
			'priority' => 3,
			'user_id' => $userId,
			'created_at' => date('Y-m-d H:i:s', time())
		]);
		DB::table('todo')->insert([
			'name' => 'second task',
			'description' => 'create login page and create new user page',
			'status' => 2,
			'priority' => 1,
			'user_id' => $userId,
			'created_at' => date('Y-m-d H:i:s', time())
		]);
		DB::table('todo')->insert([
			'name' => 'third task',
			'description' => 'create todo list, create new todo, edit a todo',
			'status' => 1,
			'priority' => 2,
			'user_id' => $userId,
			'created_at' => date('Y-m-d H:i:s', time())
		]);
		echo 'Seed successfully.';
    }
}
