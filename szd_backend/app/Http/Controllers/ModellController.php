<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Kategoria;
use App\Models\Modell;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ModellController extends Controller
{
    public function osszes_modell_termekkel()
    { 
        $modellek = DB::table('modells')
            ->join('termeks', 'modells.mod_id', '=', 'termeks.modell')
            ->join('kategorias', 'modells.kategoria', '=', 'kategorias.kat_id')
            ->select(
                'modells.mod_id as mod_id',
                'modells.nev as nev',
                'modells.leiras as leiras',
                'kategorias.kategoria_nev as kategoria',
                'modells.gyarto as gyarto',
            )
            ->distinct()
            ->get();
        return $modellek;
    }

    public function osszes_modell(){
        $modellek = DB::table('modells')
            ->select("mod_id", "nev", "leiras", "kategoria", "gyarto")
            ->get();
        return $modellek;
    }

    public function modell_kereses($kereses)
    {
        $talalatok = DB::table('modells')
            ->join('termeks', 'modells.mod_id', '=', 'termeks.modell')
            ->select('modells.*')
            ->where('modells.leiras', 'like', "%" . $kereses . "%")
            ->distinct()
            ->get();
        return $talalatok;
    }

    public function uj_modell(Request $request)
    {
        $modell = new Modell();
        $modell->nev = $request->nev;
        $modell->leiras = $request->leiras;
        $modell->kategoria = $request->kategoria;
        $modell->gyarto = $request->gyarto;
        $modell->save();
    }

    public function update_modell(Request $request)
    {
        //DB::table('modells')->where('mod_id', $request->mod_id)->delete();
        $modell = new Modell();
        $modell->mod_id = $request->mod_id;
        $modell->nev = $request->nev;
        $modell->leiras = $request->leiras;
        $modell->kategoria = $request->kategoria;
        $modell->gyarto = $request->gyarto;
        $modell->update();
    }
}
