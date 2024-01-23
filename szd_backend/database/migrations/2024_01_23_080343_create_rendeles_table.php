<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRendelesTable extends Migration
{
    public function up()
    {
        Schema::create('rendeles', function (Blueprint $table) {
            $table->id('rend_szam');
            $table->foreignId('felhasznalo')->constrained('felhasznalo', 'azon');
            $table->dateTime('kelt');
            $table->dateTime('kiszallitva2')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('rendeles');
    }
}
