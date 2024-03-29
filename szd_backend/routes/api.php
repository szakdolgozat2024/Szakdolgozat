<?php

use App\Http\Controllers\KategoriaController;
use App\Http\Controllers\ModellController;
use App\Http\Controllers\TermekController;
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

Route::get('/kategoria_nevek', [KategoriaController::class, 'kategoria_nevek']);
Route::get('/osszes_modell', [ModellController::class, 'osszes_modell']);
Route::get('/modell_termekei/{modell}/{modellNev}', [TermekController::class, 'modell_termekei']);
Route::get('/adott_termek/{termek}', [TermekController::class, 'adott_termek']);
Route::get('/modell_kereses/{kereses}', [ModellController::class, 'modell_kereses']);
Route::get('/adott_kategoria/{kategoria_nev}', [KategoriaController::class, 'adott_kategoria']);