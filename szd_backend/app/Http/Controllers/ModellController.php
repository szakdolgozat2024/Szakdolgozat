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
        ->select('modells.nev as nev', 'modells.mod_id as mod_id')
        ->distinct()
        ->get();
        return $modellek;
    }
}
