<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\TechnologyController;
use App\Http\Controllers\User\FaqController;
use App\Http\Controllers\User\ProjectController;
use App\Http\Controllers\User\ReviewController;
use App\Http\Controllers\User\StackController;
use App\Http\Controllers\User\VideoController;
use Illuminate\Support\Facades\Route;

Route::middleware('throttle:60,1')->group(function () {
    Route::apiResource('/reviews', ReviewController::class)->only(['index', 'show']);
    Route::apiResource('/videos', VideoController::class)->only(['index', 'show']);
    Route::apiResource('/faqs', FaqController::class)->only(['index', 'show']);
    Route::apiResource('/projects', ProjectController::class)->only(['index', 'show']);
    Route::apiResource('/stacks', StackController::class)->only(['index', 'show']);
    Route::apiResource('/categories', CategoryController::class)->only(['index']);
    Route::apiResource('/technologies', TechnologyController::class)->only(['index']);
});
