<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Review\CreateReviewRequest;
use App\Http\Requests\Review\UpdateReviewRequest;
use App\Models\Review;
use App\Services\ImageService;
use Illuminate\Support\Arr;

class ReviewController extends Controller
{
    public function __construct(
        private ImageService $imageService,
    ) {}

    public function store(CreateReviewRequest $request)
    {
        $validated = $request->validated();

        $review = Review::create(Arr::except($validated, ['image', 'alt_ru', 'alt_en']));

        $this->imageService->sync(
            $review,
            $request->file('image'),
            $validated['alt_ru'] ?? null,
            $validated['alt_en'] ?? null
        );

        return response()->json([
            'message' => 'Review created successfully',
            'data' => $review
        ], 201);
    }

    public function update(UpdateReviewRequest $request, Review $review)
    {
        $validated = $request->validated();

        $review->update(Arr::except($validated, ['image', 'alt_ru', 'alt_en']));

        $this->imageService->sync(
            $review,
            $request->file('image'),
            $validated['alt_ru'] ?? null,
            $validated['alt_en'] ?? null
        );

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
