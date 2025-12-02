<?php

namespace App\Http\Controllers;

use App\Models\Requests;
use App\Http\Requests\StoreRequestsRequest;
use App\Http\Requests\UpdateRequestsRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class RequestsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $req)
    {
        $id = $req->input("id");
        try {

            $requests = Requests::where('user_id', $id)->get();

            return response()->json([
                "status" => 200,
                'message' => 'all good',
                'requests' => $requests
            ]);
        } catch (Exception $e) {
            return response()->json([
                "status" => 403,
                'message' => 'Something went wrong'
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequestsRequest $request)
    {
        try {

            $validatedReq = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string|max:2055',
                'id' => 'required',
            ]);

            $req = new Requests();
            $req->title = $validatedReq['title'];
            $req->description = $validatedReq['description'];
            $req->user_id = $validatedReq['id'];
            $req->save();

            return response()->json([
                'status' => 200,
                'message' => 'Request added',
            ]);
        } catch (Exception) {
            return response()->json([
                'status' => 400,
                'message' => 'Bad request',
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Requests $requests)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Requests $requests)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequestsRequest $request,$id)
    {
        //
        try {
            $user = User::findOrFail($id);
            $user->update(['color' => $request->input('color')]);
                        return response()->json([
                'status' => 200,
                'message' => "success",
                'user' => $user
                
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => "server couldnt",
                
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Requests $requests)
    {
        //
    }
}
