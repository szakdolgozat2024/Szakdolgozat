<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBeszerzesTable extends Migration
{
    public function up()
    {
        Schema::create('beszerzes', function (Blueprint $table) {
            $table->foreignId('termek')->constrained('termek', 'ter_id');
            $table->foreignId('raktar')->constrained('raktar');
            $table->dateTime('kelt');
            $table->integer('mennyiseg');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('beszerzes');
    }
}
