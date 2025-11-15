<?php

use App\Http\Controllers\User\FaqController;
use App\Http\Controllers\User\ProjectController;
use App\Http\Controllers\User\ReviewController;
use App\Http\Controllers\User\VideoController;
use Illuminate\Support\Facades\Route;

Route::get('/reviews', [ReviewController::class, 'index']);
Route::get('/videos', [VideoController::class, 'index']);
Route::get('/faqs', [FaqController::class, 'index']);
Route::get('/projects', [ProjectController::class, 'index']);
