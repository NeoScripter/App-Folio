<?php

use App\Http\Controllers\User\ReviewController;
use App\Models\Review;
use Illuminate\Support\Facades\Route;

Route::get('/reviews', [ReviewController::class, 'index']);
