<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCsomagTable extends Migration
{
    public function up()
    {
        Schema::create('csomag', function (Blueprint $table) {
            $table->id('csom_azon');
            $table->foreignId('rendeles')->constrained('rendeles', 'rend_szam');
            $table->foreignId('futar')->constrained('futar', 'id');
            $table->string('allapot1');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('csomag');
    }
}
