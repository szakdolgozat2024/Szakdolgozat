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
            $table->string('leiras')->nullable();
            $table->decimal('ar', 10, 2);
            $table->foreignId('modell')->references('mod_id')->on('modells');
            $table->string("anyag")->nullable();
            $table->string("szin")->nullable();
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
