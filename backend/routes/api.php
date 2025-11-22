<?php

use App\Http\Controllers\LogInCon;
use App\Http\Controllers\SignUpCon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/signup', [SignUpCon::class,"index"]);
Route::post('/login', [LogInCon::class,"index"]);
