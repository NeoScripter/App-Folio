<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Video\CreateVideoRequest;
use App\Http\Requests\Video\UpdateVideoRequest;
use App\Models\Video;
use App\Services\ImageService;

class VideoController extends Controller
{
    public function __construct(
        private ImageService $imageService,
    ) {}

    public function store(CreateVideoRequest $request)
    {
        $validated = $request->validated();

        $video = Video::create($request->safe()->except(['image', 'alt_ru', 'alt_en']));

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

    public function update(UpdateVideoRequest $request, Video $video)
    {
        $validated = $request->validated();

        $video->update($request->safe()->except(['image', 'alt_ru', 'alt_en']));

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
