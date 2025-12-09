<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Requests;
use Exception;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        try {

            $users = User::query()
                ->leftJoin('requests', 'users.id', '=', 'requests.user_id')
                ->select('users.*')
                ->selectRaw('COUNT(requests.user_id) as requests')
                ->groupBy('users.id','users.firstname', 'users.lastname','users.email','users.date', 'users.password','users.country','users.currency','users.color','users.image','users.created_at','users.updated_at','users.isAdmin')
                ->get();

            return response()->json(
                ['users' => $users],
                200
            );
        } catch (Exception $e) {
            return response()->json(
                ['message' => $e],
                500
            );
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
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
