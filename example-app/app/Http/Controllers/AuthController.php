<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{


    public function register(Request $request){
        $request->validate([
            'name' => 'required|string|max:255', 
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6'
        ]);
    
        $user = User::create([
            'name' => $request->input('name'), 
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')), 
        ]); 
    
        return response()->json(['user' => $user], 201);
    }




    public function login(Request $request){
        $validatedData = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);
    
        if (!Auth::attempt($validatedData)) {
            return response()->json(['message' => 'Invalid login details'], 401);
        }
    
        $user = Auth::user(); 
        $token = $user->createToken('authtoken')->plainTextToken; 
    
        return response()->json(['user' => $user, 'token' => $token]);
    }



    public function logout(Request $request){
        $request->user()->tokens()->delete(); 
        return response()->json(['message' => 'Logged out']); 
    }

}
