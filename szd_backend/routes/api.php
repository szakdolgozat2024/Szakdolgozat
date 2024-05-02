<?php

use App\Http\Controllers\BeszerzesController;
use App\Http\Controllers\CsomagController;
use App\Http\Controllers\KategoriaController;
use App\Http\Controllers\ModellController;
use App\Http\Controllers\RendelesKontroller;
use App\Http\Controllers\Termek_tulajdonsagController;
use App\Http\Controllers\TermekController;
use App\Http\Controllers\UserController;
use App\Models\Modell;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/termek_tulajdonsagai/{termek}', [Termek_tulajdonsagController::class, 'termek_tulajdonsagai']);
Route::get('/kategoria_nevek', [KategoriaController::class, 'kategoria_nevek']);
Route::get('/osszes_kategoria', [KategoriaController::class, 'osszes_kategoria']);
Route::get('/osszes_modell', [ModellController::class, 'osszes_modell']);
Route::get('/osszes_modell_termekkel', [ModellController::class, 'osszes_modell_termekkel']);
Route::get('/modell_termekei/{modell}/{modellNev}', [TermekController::class, 'modell_termekei']);
Route::get('/adott_termek/{termek}', [TermekController::class, 'adott_termek']);
Route::get('/modell_kereses/{kereses}', [ModellController::class, 'modell_kereses']);
Route::get('/adott_kategoria/{kategoria_nev}', [KategoriaController::class, 'adott_kategoria']);
Route::get('/bejelentkezett_user/{email}/{password}', [UserController::class, 'bejelentkezett_user']);
Route::get('/user_rendelesei/{azon}', [UserController::class, 'user_rendelesei']);
Route::get('/rendelestermekei/{rend_szam}', [RendelesKontroller::class, 'rendelesTermekei']);
Route::get('/osszes_rendeles', [RendelesKontroller::class, 'osszesRendeles']);

Route::post('/rendelesrogzites', [RendelesKontroller::class, 'rendelesRogzites']);
Route::post('/rendelestetelrogzites', [RendelesKontroller::class, 'rendelesTetelRogzites']);
Route::delete('/rendelestorles/{rend_szam}', [RendelesKontroller::class, 'rendelesTorles']);

Route::post('/uj_kategoria', [KategoriaController::class, 'uj_kategoria']);
Route::delete('/kategoria_torles/{kat_id}', [KategoriaController::class, 'kategoria_torles']);
Route::put('/update_kategoria/{kat_id}', [KategoriaController::class, 'update_kategoria']);

Route::put('/update_user/{azon}', [UserController::class, 'update_user']);
Route::put('/user_update_hozzaferes/{azon}', [UserController::class, 'user_update_hozzaferes']);
Route::put('/update_csomag/{csom_azon}', [CsomagController::class, 'update_csomag']);

Route::delete('/user_torles/{azon}', [UserController::class, 'user_torles']);
Route::post('/uj_user', [UserController::class, 'uj_user']);
Route::post('/uj_user_azonositoval', [UserController::class, 'uj_user_azonositoval']);
Route::post('/uj_user_azonositoval_hozzaferessel', [UserController::class, 'uj_user_azonositoval_hozzaferessel']);
Route::get('/osszes_user', [UserController::class, 'osszes_user']);
Route::delete('/torol_user/{id}', [UserController::class, 'torol_user']);


Route::post('/uj_beszerzes', [BeszerzesController::class, 'ujBeszerzes']);
Route::get('/beszerzesek', [BeszerzesController::class, 'beszerzesek']);
Route::post('/uj_modell', [ModellController::class, 'uj_modell']);
Route::put('/update_modell/{mod_id}', [ModellController::class, 'update_modell']);
Route::delete('/modell_torles/{mod_id}', [ModellController::class, 'modell_torles']);
Route::post('/uj_termek', [TermekController::class, 'uj_termek']);
Route::put('/update_termek/{ter_id}', [TermekController::class, 'update_termek']);
Route::delete('/termek_torles/{ter_id}', [TermekController::class, 'termek_torles']);
