<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CsomagController extends Controller
{
    public function update_csomag(Request $request, $csom_azon){

        $user = DB::table('csomags')
            ->where('csom_azon', $csom_azon)
            ->update([
                'allapot' => $request->allapot,
            ]);
    }
}
