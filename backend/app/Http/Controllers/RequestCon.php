<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;

class RequestCon extends Controller
{
    public function index(Request $request)
    {
        if (mb_strlen(($request->input("title"))) > 0 && mb_strlen(($request->input("description"))) > 0) {
            try{
                                        $req = Requests::create([
                'title' =>  $request->input('firstname'),
                'description' => $request->input('lastname'),
            ]);
            }
            catch(Exception){
                            return response()->json([
                'status' => 500,
                'message' => 'Server Error',
            ]);
            }

        } else {
            return response()->json([
                'status' => 400,
                'message' => 'both title and description should not be empty',
            ]);
        }
    }
}
