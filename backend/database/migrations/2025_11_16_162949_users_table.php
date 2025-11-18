<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
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
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void

    {
Schema::dropIfExists('users');
    }
};
