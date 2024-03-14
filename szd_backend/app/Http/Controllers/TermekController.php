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
            ->select('*')
            ->where('modell', '=', $modell)
            ->get();
        return $termekek;
    }
}
