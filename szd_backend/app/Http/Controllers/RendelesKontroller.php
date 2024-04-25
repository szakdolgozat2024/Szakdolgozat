<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Csomag;
use App\Models\Rend_tetel;
use App\Models\Rendeles;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RendelesKontroller extends Controller
{
    function rendelesRogzites(Request $request){
        $csomag = new Csomag();
        $csomag->allapot = 0;
        $csomag->save();
        $csomag = Csomag::latest()->first();
        $rendeles = new Rendeles();
        $rendeles->user = $request->user;
        $rendeles->csomag = $csomag->csom_azon;
        $rendeles->kelt = DateTime::createFromFormat('Y-m-d H:i:s', date('Y-m-d H:i:s'));
        $rendeles->save();
    }


    function rendelesTetelRogzites(Request $request){
        $rendeles_tetel = new Rend_tetel();
        $rendeles_tetel->rendeles = Rendeles::latest()->first()->rend_szam;
        $rendeles_tetel->termek = $request->termek;
        $rendeles_tetel->mennyiseg = $request->mennyiseg;
        $rendeles_tetel->save();
    }

    function rendelesTorles($rend_szam) {
        DB::table('rend_tetels')
            ->where('rendeles', '=', $rend_szam)
            ->delete();
        DB::table('rendeles')
            ->where('rend_szam', '=', $rend_szam)
            ->delete();
    }

    function rendelesTermekei($rend_szam) {
        $rendeles_termekei = DB::table('rend_tetels as rt')
            ->select('rt.mennyiseg', 'rt.rendeles', 't.ar', 't.szin', 'm.nev as modellNev')
            ->join('termeks as t', 'rt.termek', '=', 't.ter_id')
            ->join('modells as m', 't.modell', '=', 'm.mod_id')
            ->where('rt.rendeles', '=', $rend_szam)
            ->get();
            return $rendeles_termekei;
    }

    function osszesRendeles()  {
        return Rendeles::all();
    }
}
