<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id('azon');
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->integer('hozzaferes')->default(0);
            $table->string('cim')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });

        User::create(['name' => "admin", 'password' => Hash::make('jelszo'), 'email' => "admin@admin.com", 'hozzaferes' => 1]);
        User::create(['name' => "vendeg", 'password' => Hash::make('jelszo'), 'email' => "vendeg@vendeg.com"]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};