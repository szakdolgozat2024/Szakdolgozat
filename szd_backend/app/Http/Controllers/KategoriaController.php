<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Kategoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class KategoriaController extends Controller
{
    public function kategoria_nevek()
    {
        $kategoria = DB::table('kategorias')->select('kategoria_nev')->get();
        return $kategoria;
    }

    public function osszes_kategoria()
    {
        $kategoriak = DB::table('kategorias')->get();
        return $kategoriak;
    }

    public function adott_kategoria($kategoria_nev)
    {
        $kategoria = DB::table('modells as m')
        ->join('kategorias as k', 'm.kategoria', '=', 'k.kat_id')
        ->where('kategoria_nev', '=', $kategoria_nev)
        ->get();
        return $kategoria;
    }

    public function uj_kategoria (Request $request){
        $kategoria = new Kategoria();
        $kategoria->kategoria_nev = $request->kategoria_nev;
        $kategoria->save();
    }

    public function kategoria_torles ($kat_id){
        DB::table('kategorias')->where('kat_id', $kat_id)->delete();
    }

    public function update_kategoria(Request $request, $kat_id){
        $kategoria = DB::table('kategorias')
            ->where('kat_id', $kat_id)
            ->update([
                'kategoria_nev' => $request->kategoria_nev
            ]);
    }
}
