<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Image;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

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
            'alt_en' => 'required|string|max:255',
            'alt_ru' => 'required|string|max:255',
        ]);

        $review = Review::create(Arr::except($validated, ['image', 'alt_ru', 'alt_en']));

        if ($request->hasFile('image')) {
            Image::attachTo($review, $request->file('image'), $validated['alt_ru'], $validated['alt_en']);
        }
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
            'alt_en' => 'sometimes|required|string|max:255',
            'alt_ru' => 'sometimes|required|string|max:255',
        ]);

        $review->update(Arr::except($validated, ['image', 'alt_ru', 'alt_en']));

        if ($request->hasFile('image')) {
            if ($review->image) {
                $review->image->delete();
            }
            Image::attachTo($review, $request->file('image'), $validated['alt_ru'], $validated['alt_en']);
        } elseif ($review->image && ($validated['alt_ru'] ?? $validated['alt_en'] ?? false)) {
            $review->image->update(Arr::only($validated, ['alt_ru', 'alt_en']));
        }
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
