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
        Schema::create('model_tulajdonsags', function (Blueprint $table) {
            $table->primary(['model', 'tulajdonsag']);
            $table->foreignId('model')->references('mod_id')->on('modells');
            $table->string('tulajdonsag');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('model_tulajdonsags');
    }
};
