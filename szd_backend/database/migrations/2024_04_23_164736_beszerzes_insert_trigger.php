<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::unprepared('CREATE TRIGGER beszerzes_insert_trigger AFTER INSERT ON beszerzes
        FOR EACH ROW
        BEGIN
            DECLARE termek_mennyiseg INT;
            
            SELECT keszlet INTO termek_mennyiseg FROM termeks WHERE ter_id = NEW.termek;
            
            UPDATE termeks SET keszlet = termek_mennyiseg + NEW.mennyiseg WHERE ter_id = NEW.termek;
        END;
        ');        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared('DROP TRIGGER beszerzes_insert_trigger IF EXISTS;');
    }
};
