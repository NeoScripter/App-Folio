<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Image;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class VideoController extends Controller
{
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

        if ($request->hasFile('image')) {
            Image::attachTo($video, $request->file('image'), $validated['alt_ru'], $validated['alt_en']);
        }
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

        if ($request->hasFile('image')) {
            if ($video->image) {
                $video->image->delete();
            }
            Image::attachTo($video, $request->file('image'), $validated['alt_ru'], $validated['alt_en']);
        } elseif ($video->image && ($validated['alt_ru'] ?? $validated['alt_en'] ?? false)) {
            $video->image->update(Arr::only($validated, ['alt_ru', 'alt_en']));
        }
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
