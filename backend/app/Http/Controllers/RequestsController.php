<?php

namespace App\Http\Controllers;

use App\Models\Requests;
use App\Http\Requests\StoreRequestsRequest;
use App\Http\Requests\UpdateRequestsRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

use function PHPUnit\Framework\isEmpty;

class RequestsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $req)
    {
        $id = $req->input("id");
        //get by ID
        if (!(isEmpty($id))) {
            try {

                $requests = Requests::where('user_id', $id)->get();

                return response()->json([
                    'message' => 'all good',
                    'requests' => $requests
                ], 200);
            } catch (Exception $e) {
                return response()->json([
                    'message' => 'Something went wrong'
                ], 500);
            }
        } else {
            //get everything

            try {

                //$requests = Requests::get()->all();

                $requests = Requests::query()
                    ->leftJoin('users', 'requests.user_id', '=', 'users.id')
                    ->select('requests.*')
                    ->selectRaw('users.image')
                    ->groupBy(
                'requests.user_id',
                        'requests.title',
                        'requests.description',
                        'requests.status',
                        'requests.created_at',
                        'requests.updated_at',
                        'requests.id',
                        'users.image',
                    )
                    ->get();

                return response()->json([
                    'message' => 'all goodie',
                    'requests' => $requests
                ],  200);
            } catch (Exception $e) {
                return response()->json(
                    [
                        'message' => $e
                    ],
                    500
                );
            }
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
    public function update(UpdateRequestsRequest $request, $id)
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
    public function destroy(Request $request)
    {
        try {
            Requests::where('id', $request->input('id'))
                ->where('user_id', $request->input('userId'))
                ->delete();

            $reqs = Requests::where('user_id', $request->input('userId'))->get();

            return response()->json(
                ['message' => 'Requests deleted successfully', 'requests' => $reqs],
                200
            );
        } catch (Exception $e) {
            return response()->json(
                ['message' => 'somthing went wrong'],
                500
            );
        }
    }
}
