<?php

use App\Http\Controllers\User\FaqController;
use App\Http\Controllers\User\ProjectController;
use App\Http\Controllers\User\ReviewController;
use App\Http\Controllers\User\StackController;
use App\Http\Controllers\User\VideoController;
use Illuminate\Support\Facades\Route;

Route::get('/reviews', [ReviewController::class, 'index']);
Route::get('/videos', [VideoController::class, 'index']);
Route::apiResource('/faqs', FaqController::class);
Route::apiResource('/projects', ProjectController::class);
Route::get('/stacks', [StackController::class, 'index']);
