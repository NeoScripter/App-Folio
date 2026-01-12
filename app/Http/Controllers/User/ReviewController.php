<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReviewResource;
use App\Models\Review;

class ReviewController extends Controller
{
    public function index()
    {
        $query = Review::query();
        if (request()->filled('latest')) {
            $query->latest();
        }
        return ReviewResource::collection($query->get());
    }

    public function show(Review $review)
    {
        return new ReviewResource($review);
    }
}
