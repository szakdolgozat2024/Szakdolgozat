<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ModellController extends Controller
{
    public function osszes_modell() { /* amihez van termék */
        $modellek = DB::table('modells')
        ->join('termeks', 'modells.mod_id', '=', 'termeks.modell')
        ->select('modells.mod_id as mod_id', 'modells.nev as nev', 'modells.leiras as leiras', 'modells.kategoria as kategoria', 
        'modells.gyarto as gyarto', 'modells.gyarto as gyarto')
        ->distinct()
        ->get();
        return $modellek;
    }

    public function modell_kereses($kereses) { 
        $talalatok = DB::table('modells')
        ->select('modells.nev as nev', 'modells.mod_id as mod_id')
        ->where('leiras', 'like', "%".$kereses."%")
        ->get();
        return $talalatok;
    }

}
