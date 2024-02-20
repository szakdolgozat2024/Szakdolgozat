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
        Schema::create('termeks', function (Blueprint $table) {
            $table->id('ter_id');
            $table->text('leiras');
            $table->decimal('ar', 10, 2);
            $table->foreignId('modell')->references('mod_id')->on('modells');
            $table->string("anyag");
            $table->string("szin");
            $table->integer("keszlet");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('termeks');
    }
};
