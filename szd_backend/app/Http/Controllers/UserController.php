<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    
    public function datumUtaniRendelesek($datum): View
    {
        $rendelesek = DB::table('rendeles')
        ->select('rendszam, felhasznalo')
        ->where('kelt','<=', $datum)
        ->get();

        return $rendelesek;
    }
}
