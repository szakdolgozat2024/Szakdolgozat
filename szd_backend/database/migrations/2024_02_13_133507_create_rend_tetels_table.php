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
        Schema::create('rend_tetel', function (Blueprint $table) {
            $table->foreignId('rendeles')->constrained('rendeles', 'rend_szam');
            $table->foreignId('termek')->constrained('termek', 'ter_id');
            $table->integer('mennyiseg');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rend_tetels');
    }
};
