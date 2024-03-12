<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ModellController extends Controller
{
    public function osszes_modell() {
        $modellek = DB::table('modells')
        ->select('nev')
        ->get();
        return $modellek;
    }
}
