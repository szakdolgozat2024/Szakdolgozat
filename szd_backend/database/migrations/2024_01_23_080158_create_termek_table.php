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
        Schema::create('termek', function (Blueprint $table) {
            $table->id('ter_id');
            $table->string('termek_nev');
            $table->text('leiras');
            $table->decimal('ar', 10, 2);
            $table->foreignId('kategoria')->constrained('kategoria', 'kat_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('termek');
    }
};
