<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTermekTulajdonsagTable extends Migration
{
    public function up()
    {
        Schema::create('termek_tulajdonsag', function (Blueprint $table) {
            $table->foreignId('termek')->constrained('termek', 'ter_id');
            $table->string('nev');
            $table->string('ertek');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('termek_tulajdonsag');
    }
}