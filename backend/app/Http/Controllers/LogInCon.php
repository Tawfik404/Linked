<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class LogInCon extends Controller
{
    public function index(Request $request)
    {
        $user = User::where('email', $request->input('email'))->first();

        if ($user) {
            if (Hash::check($request->input('password'), $user->password)) {
                // password is correct
                return response()->json([
                    'status' => 200,
                    'message' => 'User exists',
                    'user' => $user
                ]);
            } else {
                return response()->json([
                    'status' => 409,
                    'message' => 'wrong password',
                ]);

            }
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'User does not exist'
            ]);
        }
    }
}
