<?php

use App\Models\Felhasznalo;
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
        Schema::create('felhasznalos', function (Blueprint $table) {
            $table->id('azon');
            $table->string('nev');
            $table->string('jelszo');
            $table->integer('hozzaferes')->default(0);
            $table->string('email')->unique();
            $table->string('cim')->nullable();
            $table->timestamps();
        });

        Felhasznalo::create(['nev' => "admin", 'jelszo' => Hash::make('jelszo'), 'hozzaferes' => 1, 'email' => "admin@admin.com"]);
        Felhasznalo::create(['nev' => "vendeg", 'jelszo' => Hash::make('jelszo'), 'email' => "vendeg@vendeg.com"]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('felhasznalos');
    }
};
