<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRaktarTable extends Migration
{
    public function up()
    {
        Schema::create('raktar', function (Blueprint $table) {
            $table->id();
            $table->string('raktar_nev');
            $table->string('cim');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('raktar');
    }
}
