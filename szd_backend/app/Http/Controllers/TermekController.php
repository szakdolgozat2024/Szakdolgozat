<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Termek;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TermekController extends Controller
{
    public function modell_termekei($modell, $modellNev)
    {
        $termekek = DB::table('termeks as t')
            ->join('modells as m', 'm.mod_id', '=', 't.modell')
            ->join('kategorias as k', 'm.kategoria', '=', 'k.kat_id')
            ->select("m.*", "t.*", "k.kategoria_nev as kategoria_nev")
            ->where('t.modell', '=', $modell)
            ->where('m.nev', '=', $modellNev)
            ->get();
        return $termekek;
    }

    public function adott_termek($id)
    {
        $termek = DB::table('termeks')
            ->select("*")
            ->join('modells', 'modells.mod_id', '=', 'termeks.modell')
            ->where('ter_id', '=', $id)
            ->get();
        return $termek;
    }

    public function uj_termek(Request $request)
    {
        $termek = new Termek();
        $termek->ar = $request->ar;
        $termek->modell = $request->modell;
        $termek->anyag = $request->anyag;
        $termek->szin = $request->szin;
        $termek->keszlet = 0;
        $termek->save();
    }

    public function update_termek(Request $request, $ter_id)
    {
        $termek = DB::table('termeks')
            ->where('ter_id', $ter_id)
            ->update([
                'ar' => $request->ar,
                'modell' => $request->modell,
                'anyag' => $request->anyag,
                'szin' => $request->szin,
            ]);
    }

    public function termek_torles($ter_id)
    {
        $termek = DB::table('termeks')
            ->where('ter_id', $ter_id)
            ->delete();
    }
}
