<?php

use App\Models\Kategoria;
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
        Schema::create('kategorias', function (Blueprint $table) {
            $table->id('kat_id');
            $table->string('kategoria_nev');
            $table->timestamps();
        });

        Kategoria::create(['kategoria_nev' => 'konyhabútor']);
        Kategoria::create(['kategoria_nev' => 'hálószobabútor']);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kategorias');
    }
};
