<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFelhasznaloTable extends Migration
{
    public function up()
    {
        Schema::create('felhasznalo', function (Blueprint $table) {
            $table->id('azon');
            $table->string('nev');
            $table->string('jelszo');
            $table->string('hozzaferes');
            $table->string('email');
            $table->string('cim');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('felhasznalo');
    }
}
