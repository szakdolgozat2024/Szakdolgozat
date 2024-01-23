<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFutarTable extends Migration
{
    public function up()
    {
        Schema::create('futar', function (Blueprint $table) {
            $table->id();
            $table->string('nev');
            $table->string('telefon');
            $table->string('email');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('futar');
    }
}
