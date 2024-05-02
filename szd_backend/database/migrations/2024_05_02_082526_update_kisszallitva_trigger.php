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
        DB::unprepared('CREATE TRIGGER update_kiszallitva_trigger AFTER UPDATE ON csomags
        FOR EACH ROW
        BEGIN
            IF NEW.allapot = 3 THEN
                UPDATE rendeles SET kiszallitva = NOW() WHERE NEW.csom_azon = rendeles.csomag;
            END IF;
        END;        
        ');  
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared('DROP TRIGGER update_kiszallitva_trigger IF EXISTS;');
    }
};