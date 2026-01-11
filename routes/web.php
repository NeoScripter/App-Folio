<?php

use App\Http\Controllers\Admin\FaqController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\ProfileController;
use App\Http\Controllers\User\ContactController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->post('/login', [AuthController::class, 'store'])->name('login');

Route::post('/email', [ContactController::class, 'store']);

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'destroy']);
    Route::get('/user', [AuthController::class, 'show']);

    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::put('settings/password', [PasswordController::class, 'update'])->name('password.update');

    Route::prefix('admin')->group(function () {
        Route::post('/faqs', [FaqController::class, 'store']);
        Route::put('/faqs/{faq}', [FaqController::class, 'update']);
        Route::delete('/faqs/{faq}', [FaqController::class, 'destroy']);
    });
});

Route::get('/{any}', fn() => view('app'))
    ->where('any', '^(?!api).*');
