<?php

use App\Models\Review;
use Illuminate\Support\Facades\Route;

Route::get('/reviews', function () {
    return Review::all();
});
