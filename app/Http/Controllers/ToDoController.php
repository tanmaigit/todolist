<?php
 
namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\ToDo;
use Auth;
 
class ToDoController extends Controller{

	/**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // When performing on todo, must check the api_token as authenticated user
		$this->middleware('auth');
    }
	
	public function get(Request $request, $id)
	{
		$params = $request->all();
		$todos = Auth::user()->tasks()->where(function ($query) use ($id, $params) {
			if($id != 'all')
				$query->where('id', '=', $id);
			if(!empty($params['name']))
				$query->where('name', 'LIKE', '%'.$params['name'].'%');
			if(!empty($params['description']))
				$query->where('description', 'LIKE', '%'.$params['description'].'%');
			if(!empty($params['priority']))
				$query->where('priority', '=', $params['priority']);
			if(!empty($params['status']))
				$query->where('status', '=', $params['status']);
		});
		// Sort
		if(!empty($params['sortBy'])){
			$sortBy = explode(',', $params['sortBy']);
			if(count($sortBy) == 2)
				$todos->orderBy($sortBy[0], $sortBy[1]);
		}
		// Get data
		if($id == 'all')
			return response()->json(['list' => $todos->get()]);
		else
			return response()->json(['todo' => $todos->first()]);
	}

	public function create(Request $request){
		$toDoAttrs = $request->all();
		$toDoAttrs['status'] = !empty($toDoAttrs['status']) ? $toDoAttrs['status'] : 1;
    	$todo = ToDo::create($toDoAttrs);
    	return response()->json($todo);
	}
	
	public function updateStatus(Request $request){
    	$todo = ToDo::find($request->input('id'));
		if($todo instanceof ToDo){
			$todo->status = $request->input('status');
			$todo->save();
		}
    	return response()->json($todo);
	}
	
	public function updatePriority(Request $request){
    	$todo = ToDo::find($request->input('id'));
		if($todo instanceof ToDo){
			$todo->priority = $request->input('priority');
			$todo->save();
		}
    	return response()->json($todo);
	}
 
	public function update(Request $request, $id){
    	$todo = ToDo::find($id);
		if($todo instanceof ToDo){
			$todo->name = $request->input('name');
			$todo->description = $request->input('description');
			$todo->status = $request->input('status');
			$todo->priority = $request->input('priority');
			$todo->save();
		}
    	return response()->json($todo);
	}

	public function delete($id){
    	$todo = ToDo::find($id);
    	$todo->delete();
 
    	return response()->json('Deleted successfully.');
	}
}
?>