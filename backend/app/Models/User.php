<?php

namespace App\Models;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    //
    
        use HasFactory;

        

    protected $fillable = ['firstname', 'lastname','email','date', 'password','country','currency','color','image'];
}
