<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Requests;
use Exception;
use Illuminate\Http\Request;

class StatsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //get all stats
        try {
            $users = User::where('isAdmin', 0)->count();
            $admins = User::where('isAdmin', 1)->count();
            $requests = Requests::count();
            $pending = Requests::where('status', 'pending')->count();
            $accepted = Requests::where('status', 'accepted')->count();
            $rejected = Requests::where('status', 'rejected')->count();


            return response()->json([
                'users' => $users,
                'admins' => $admins,
                'requests' => $requests,
                'pending' => $pending,
                'accepted' => $accepted,
                'rejected' => $rejected,
            ], 200);
        }
        //if they all fail
        catch (Exception $e) {
            return response()->json(['message', $e], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        //
        try {
            $req = Request::where('id',$request->input('id'));
            $req->update(['status'=>'']);
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
        } catch (Exception $e) {
            return response()->json(
                ['message' => $e],
                500
            );
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
