<?php

use App\Http\Controllers\KategoriaController;
use App\Http\Controllers\ModellController;
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