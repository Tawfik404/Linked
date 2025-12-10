<?php

use App\Http\Controllers\LogInCon;
use App\Http\Controllers\RequestsController;
use App\Http\Controllers\SignUpCon;
use App\Http\Controllers\StatsController;
use App\Http\Controllers\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/signup', [SignUpCon::class, "index"]);

Route::post('/login', [LogInCon::class, "index"]);

Route::apiResource('/requests', RequestsController::class);
Route::patch('/requests/{id}', [RequestsController::class,'update']);
Route::delete('/requests', [RequestsController::class,'destroy']);
Route::apiResource('/users', UsersController::class);
Route::apiResource('/stats', StatsController::class);
Route::apiResource('/requests', StatsController::class);