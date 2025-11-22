<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;



class SignUpCon extends Controller
{
    public function index(Request $request)
    {
        $checkUser = User::where('email', $request->input('email'))->first();
        
        if ($checkUser) {
            return response()->json([
                'status' => 409,
                'message' => 'User already exists'
            ]);
        } else {
            
            $date = Carbon::createFromFormat('m/d/Y', $request->input('date'))->format('Y-m-d');
            $user = User::create([
                'firstname' =>  $request->input('firstname'),
                'lastname' => $request->input('lastname'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
                'country' => $request->input('country'),
                'currency' => $request->input('currency'),
                'image' => $request->input('img'),
                'color' => $request->input('color'),
                'date' => $date
            ]);

        $userCreated = User::where('email', $request->input('email'))->first();

            return response()->json([
                'status' => 200,
                'message' => 'User created',
                'user' => $userCreated
            ]);
        }
    }
}
