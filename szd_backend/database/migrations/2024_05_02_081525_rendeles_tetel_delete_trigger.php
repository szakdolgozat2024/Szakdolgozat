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
        DB::unprepared('CREATE TRIGGER rendeles_tetel_delete_trigger AFTER DELETE ON rend_tetels
        FOR EACH ROW
        BEGIN
            DECLARE termek_mennyiseg INT;
            
            SELECT keszlet INTO termek_mennyiseg FROM termeks WHERE ter_id = OLD.termek;
            
            UPDATE termeks SET keszlet = termek_mennyiseg + OLD.mennyiseg WHERE ter_id = OLD.termek;
        END;
    
        ');  
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared('DROP TRIGGER rendeles_tetel_delete_trigger IF EXISTS;');
    }
};
