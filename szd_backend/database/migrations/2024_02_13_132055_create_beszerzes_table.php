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
        Schema::create('beszerzes', function (Blueprint $table) {
            $table->primary(['termek','kelt']);
            $table->foreignId('termek')->references('ter_id')->on('termeks');
            $table->dateTime('kelt');
            $table->integer('mennyiseg');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('beszerzes');
    }
};
