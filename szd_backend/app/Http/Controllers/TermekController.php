<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TermekController extends Controller
{
    public function modell_termekei($modell, $modellNev)
    {
        $termekek = DB::table('termeks')
            ->select("*")
            ->join('modells', 'modells.mod_id', '=', 'termeks.modell')
            ->where('termeks.modell', '=', $modell)
            ->where('modells.nev', '=', $modellNev)
            ->get();
        return $termekek;
    }
}
