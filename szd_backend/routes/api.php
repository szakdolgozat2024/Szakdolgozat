<?php

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
Route::get('/modell_termekei/{modell}/{modellNev}', [TermekController::class, 'modell_termekei']);
Route::get('/adott_termek/{termek}', [TermekController::class, 'adott_termek']);
Route::get('/modell_kereses/{kereses}', [ModellController::class, 'modell_kereses']);
Route::get('/adott_kategoria/{kategoria_nev}', [KategoriaController::class, 'adott_kategoria']);
Route::get('/bejelentkezett_user/{email}/{password}', [UserController::class, 'bejelentkezett_user']);
Route::get('/user_rendelesei/{azon}', [UserController::class, 'user_rendelesei']);
Route::get('/rendelestermekei/{rend_szam}', [RendelesKontroller::class, 'rendelesTermekei']);



Route::post('/rendelesrogzites', [RendelesKontroller::class, 'rendelesRogzites']);
Route::post('/rendelestetelrogzites', [RendelesKontroller::class, 'rendelesTetelRogzites']);
Route::delete('/rendelestorles/{rend_szam}', [RendelesKontroller::class, 'rendelesTorles']);

Route::put('/update_modell_kategoria', [ModellController::class, 'update_modell_kategoria']);


Route::put('/update_user/{azon}', [UserController::class, 'update_modell_kategoria']);
Route::delete('/user_torles/{azon}', [UserController::class, 'user_torles']);
Route::post('/uj_user', [UserController::class, 'uj_user']);
Route::post('/uj_user_azonositoval', [UserController::class, 'uj_user_azonositoval']);
Route::post('/uj_modell', [UserController::class, 'uj_modell']);
Route::post('/update_modell', [ModellController::class, 'update_modell']);