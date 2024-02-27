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
        Schema::create('rendeles', function (Blueprint $table) {
            $table->id('rend_szam');
            $table->foreignId('user')->constrained('users', 'azon');
            $table->foreignId('csomag')->references('csom_azon')->on('csomags')->nullable();
            $table->dateTime('kelt');
            $table->dateTime('kiszallitva')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rendeles');
    }
};
