<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class KategoriaController extends Controller
{
    public function kategoria_nevek()
    {
        $kategoria = DB::table('kategorias')->select('kategoria_nev')->get();
        return $kategoria;
    }

    public function adott_kategoria($kategoria_nev)
    {
        $kategoria = DB::table('modells as m')
        ->join('kategorias as k', 'm.kategoria', '=', 'k.kat_id')
        ->where('kategoria_nev', '=', $kategoria_nev)
        ->get();
        return $kategoria;
    }
}
