<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Termek_tulajdonsagController extends Controller
{
    public function termek_tulajdonsagai($termek)
    {
        $tulajdonsagok = DB::table('termek_tulajdonsags')
            ->select("*")
            ->join('tulajdonsags', 'tulajdonsags.azonosito', '=', 'termek_tulajdonsags.tulajdonsag')
            ->where('termek_tulajdonsags.termek', '=', $termek)
            ->get();
        return $tulajdonsagok;
    }
}
