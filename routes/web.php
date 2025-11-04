<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->post('/login', [AuthController::class, 'store'])->name('login');

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'destroy']);
    Route::get('/user', [AuthController::class, 'show']);
});

Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
