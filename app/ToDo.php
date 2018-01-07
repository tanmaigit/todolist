<?php namespace App;
 
use Illuminate\Database\Eloquent\Model;
 
class ToDo extends Model
{
	protected $table = 'todo';
 	protected $fillable = ['name', 'description', 'status', 'priority', 'user_id'];
}
?>