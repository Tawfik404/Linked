<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::dropIfExists('users');
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('firstname');
            $table->string('lastname');
            $table->string('password');
            $table->string('color');
            $table->string('country');
            $table->string('currency');
            $table->string('image');
            $table->date('date')->nullable();
            $table->string('email')->unique();
            $table->timestamps();
            $table->boolean("isAdmin")->default(false);
        });


        DB::table('users')->insert([
            'firstname' => 'Tawfik',
            'lastname' => 'Abouhmad',
            'password' => Hash::make("admin"),
            'email' => 'admin@gmail.com',
            'date' => '2004-04-24',
            'country' => 'Morocco',
            'currency' => 'USD',
            'color' => '#4338ca',
            'image' => '',
            'isAdmin' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void

    {
        Schema::dropIfExists('users');
    }
};
