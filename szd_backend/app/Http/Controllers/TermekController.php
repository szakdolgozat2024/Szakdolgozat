<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TermekController extends Controller
{
    public function modell_termekei($modell, $modellNev)
    {
        $termekek = DB::table('termeks as t')
            ->join('modells as m', 'm.mod_id', '=', 't.modell')
            ->join('kategorias as k', 'm.kategoria', '=', 'k.kat_id')
            ->select("m.*", "t.*" , "k.kategoria_nev as kategoria_nev")
            ->where('t.modell', '=', $modell)
            ->where('m.nev', '=', $modellNev)
            ->get();
        return $termekek;
    }

    public function adott_termek($id){
        $termek = DB::table('termeks')
            ->select("*")
            ->join('modells', 'modells.mod_id', '=', 'termeks.modell')
            ->where('ter_id', '=', $id)
            ->get();
        return $termek;
    }
}   
