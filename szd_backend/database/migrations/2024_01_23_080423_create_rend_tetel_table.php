<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRendTetelTable extends Migration
{
    public function up()
    {
        Schema::create('rend_tetel', function (Blueprint $table) {
            $table->foreignId('rendeles')->constrained('rendeles', 'rend_szam');
            $table->foreignId('termek')->constrained('termek', 'ter_id');
            $table->integer('mennyiseg');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('rend_tetel');
    }
}
