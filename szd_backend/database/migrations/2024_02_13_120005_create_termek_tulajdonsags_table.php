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
        Schema::create('termek_tulajdonsag', function (Blueprint $table) {
            $table->primary(['termek','tulajdonsag']);
            $table->foreignId('termek')->constrained('termeks', 'ter_id');
            $table->foreignId('tulajdonsag')->references('azonosito')->on('tulajdonsags');
            $table->string('ertek');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('termek_tulajdonsags');
    }
};
