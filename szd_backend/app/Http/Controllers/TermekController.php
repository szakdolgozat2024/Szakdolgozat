<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TermekController extends Controller
{
    public function modell_termekei($modell)
    {
        $termekek = DB::table('termeks')
            ->select('termeks.ter_id AS ter_id', 'termeks.leiras AS leiras', 'termeks.ar AS ar', 'termeks.modell AS modell',
             'termeks.anyag AS anyag', 'termeks.szin AS szin', 'modells.nev AS nev')
            ->join('modells', 'modells.mod_id', '=', 'termeks.modell')
            ->where('modells.nev', '=', $modell)
            ->get();
        return $termekek;
    }
}
