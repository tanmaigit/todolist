<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\User;

class UserController extends Controller
{
	private function generateApiToken()
	{
		return 'api_token_'.str_random(20);
	}
	
	private function findUser($username, $email)
	{
		return User::where(function ($query) use ($username, $email) {
			$query->where('username', '=', $username)
				  ->orWhere('email', '=', $email);
		})->first();
	}
	
	public function create(Request $request)
	{
		$username = $request->input('username');
		$email = $request->input('email');
		
		$user = $this->findUser($username, $email);
		
		if($user instanceof User){
			return response()->json(['errorCode' => 'USER_EXISTED', 'errorMessage' => 'This user has already existed.']);
		}else{
			$userAttrs = $request->all();
			// Update token to login after created
			$userAttrs['api_token'] = $this->generateApiToken();
			$user = User::create($userAttrs);
			return response()->json(['user' => $user]);
		}
	}
	
	public function login(Request $request)
	{
		$username = $request->input('username');
		
		$user = $this->findUser($username, $username);
		
		if($user instanceof User){
			if(Hash::check($request->input('password'), $user->password)){
				$user->api_token = $this->generateApiToken();
				$user->save();
				return response()->json(['user' => $user]);
			}else {
				return response()->json(['errorCode' => 'INVALID_USER', 'errorMessage' => 'Username or password is incorrect.']);
			}
		}else{
			return response()->json(['errorCode' => 'INVALID_USER', 'errorMessage' => 'Username or password is incorrect.']);
		}
	}
	
	public function logout(Request $request)
	{
		$user = User::find($request->input('id'));
		if($user instanceof User){
			$user->api_token = null;
			$user->save();
		}
		return response()->json('Logout successfully.');
	}
}
?>