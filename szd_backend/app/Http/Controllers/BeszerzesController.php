<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Beszerzes;
use DateTime;
use Illuminate\Http\Request;

class BeszerzesController extends Controller
{
    function ujBeszerzes(Request $request){
        $beszerzes = new Beszerzes();
        $beszerzes->termek = $request->termek;
        $beszerzes->kelt = DateTime::createFromFormat('Y-m-d H:i:s', date('Y-m-d H:i:s'));;
        $beszerzes->mennyiseg = $request->mennyiseg;
        $beszerzes->save();
    }

    function beszerzesek(){return Beszerzes::all();}
}
