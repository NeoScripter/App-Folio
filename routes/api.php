<?php

use App\Http\Controllers\User\ReviewController;
use App\Http\Controllers\User\VideoController;
use Illuminate\Support\Facades\Route;

Route::get('/reviews', [ReviewController::class, 'index']);
Route::get('/videos', [VideoController::class, 'index']);
