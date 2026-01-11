<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name_en' => 'required|string|max:255',
            'name_ru' => 'required|string|max:255',
            'content_en' => 'required|string',
            'content_ru' => 'required|string',
            'image' => 'nullable|image|max:2048',
            'image_alt' => 'required|string|max:255',
        ]);

        $review = Review::create($validated);

        return response()->json([
            'message' => 'Review created successfully',
            'data' => $review
        ], 201);
    }

    public function update(Request $request, Review $review)
    {
        $validated = $request->validate([
            'name_en' => 'sometimes|required|string|max:255',
            'name_ru' => 'sometimes|required|string|max:255',
            'content_en' => 'sometimes|required|string',
            'content_ru' => 'sometimes|required|string',
            'image' => 'sometimes|image|max:2048',
            'image_alt' => 'sometimes|required|string|max:255',

        ]);

        $review->update($validated);

        return response()->json([
            'message' => 'Review updated successfully',
            'data' => $review
        ]);
    }

    public function destroy(Review $review)
    {
        $review->delete();

        return response()->json([
            'message' => 'Review deleted successfully'
        ]);
    }
}
