<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

use function Laravel\Prompts\select;

class UserController extends Controller
{

    public function datumUtaniRendelesek($datum)
    {
        $rendelesek = DB::table('rendeles')
            ->select('rendszam, felhasznalo')
            ->where('kelt', '<=', $datum)
            ->get();

        return $rendelesek;
    }

    public function legnepszerubbTermekModellenbelul($modell)
    {
        $termekek = DB::table('termek t')
            ->select('modell, termek,  SUM(mennyiseg) as rendelt_db ')
            ->join('rend_tetel rt', 't.termek_id', '=', 'rt.termek')
            ->where('t.modell', '=', $modell)
            ->groupBy('termek')
            ->orderBy('rendelt_db')
            ->get();

        return $termekek;
    }

    public function bejelentkezett_user($email, $password)
    {
        $pass = DB::table('users')
            ->select('password')
            ->where('email', '=', $email)
            ->get();
        if (Hash::check($password, $pass[0]->password)) {
            $user = DB::table('users')
                ->select('*')
                ->where('email', '=', $email)
                ->get();
        }
        return $user;
    }
}
