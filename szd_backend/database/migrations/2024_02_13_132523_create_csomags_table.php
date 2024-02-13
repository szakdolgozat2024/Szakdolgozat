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
        Schema::create('csomags', function (Blueprint $table) {
            $table->id('csom_azon');
            $table->foreignId('rendeles')->constrained('rendeles', 'rend_szam');
            $table->foreignId('futar')->constrained('futar', 'id');
            $table->string('allapot1');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('csomags');
    }
};
