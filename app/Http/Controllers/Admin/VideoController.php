<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Image;
use App\Models\Video;
use App\Services\ImageService;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class VideoController extends Controller
{
    public function __construct(
        private ImageService $imageService,
    ) {}

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title_en' => 'required|string',
            'title_ru' => 'required|string',
            'url' => 'required|string',
            'image' => 'nullable|image|max:4048',
            'alt_en' => 'required|string|max:255',
            'alt_ru' => 'required|string|max:255',
        ]);

        $video = Video::create(Arr::except($validated, ['image', 'alt_ru', 'alt_en']));

        $this->imageService->sync(
            $video,
            $request->file('image'),
            $validated['alt_ru'] ?? null,
            $validated['alt_en'] ?? null
        );

        return response()->json([
            'message' => 'Video created successfully',
            'data' => $video
        ], 201);
    }

    public function update(Request $request, Video $video)
    {
        $validated = $request->validate([
            'title_en' => 'sometimes|required|string',
            'title_ru' => 'sometimes|required|string',
            'url' => 'sometimes|required|string',
            'image' => 'sometimes|image|max:4048',
            'alt_en' => 'sometimes|required|string|max:255',
            'alt_ru' => 'sometimes|required|string|max:255',
        ]);

        $video->update(Arr::except($validated, ['image', 'alt_ru', 'alt_en']));

        $this->imageService->sync(
            $video,
            $request->file('image'),
            $validated['alt_ru'] ?? null,
            $validated['alt_en'] ?? null
        );

        return response()->json([
            'message' => 'Video updated successfully',
            'data' => $video
        ]);
    }

    public function destroy(Video $video)
    {
        $video->delete();

        return response()->json([
            'message' => 'Video deleted successfully'
        ]);
    }
}
