<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Image;
use App\Models\Project;
use App\Services\ImageService;
use App\Services\Project\ProjectCategoryService;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class ProjectController extends Controller
{
    public function __construct(
        private ImageService $imageService,
        private ProjectCategoryService $categoryService
    ) {}

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title_en' => 'required|string|max:255',
            'title_ru' => 'required|string|max:255',
            'description_en' => 'required|string',
            'description_ru' => 'required|string',
            'link' => 'nullable|string',
            'order' => 'required|integer',
            'category_en' => 'required|string',
            'category_ru' => 'required|string',
            'mockup' => 'required_with:image|integer|between:1,6',
            'image' => 'nullable|image|max:4048',
            'alt_en' => 'required_with:image|string|max:255',
            'alt_ru' => 'required_with:image|string|max:255',
        ]);

        $project = Project::create($request->safe()->except(['image', 'alt_ru', 'alt_en', 'mockup', 'category_ru', 'category_en']));

        $this->categoryService->sync(
            $project,
            $validated['category_en'] ?? null,
            $validated['category_ru'] ?? null
        );

        $this->imageService->sync(
            $project,
            $request->file('image'),
            $validated['alt_ru'] ?? null,
            $validated['alt_en'] ?? null,
            $validated['mockup'] ?? null
        );

        return response()->json([
            'message' => 'Project created successfully',
            'data' => $project->load('image')
        ], 201);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title_en' => 'sometimes|required|string|max:255',
            'title_ru' => 'sometimes|required|string|max:255',
            'description_en' => 'sometimes|required|string',
            'description_ru' => 'sometimes|required|string',
            'link' => 'sometimes|nullable|string',
            'order' => 'sometimes|required|integer',
            'category_en' => 'sometimes|required|string',
            'category_ru' => 'sometimes|required|string',
            'image' => 'sometimes|image|max:4048',
            'mockup' => 'required_with:image|integer|between:1,6',
            'alt_en' => 'required_with:image|string|max:255',
            'alt_ru' => 'required_with:image|string|max:255',
        ]);

        $project->update($request->safe()->except(['image', 'alt_ru', 'alt_en', 'mockup', 'category_ru', 'category_en']));

        $this->categoryService->sync(
            $project,
            $validated['category_en'] ?? null,
            $validated['category_ru'] ?? null
        );

        $this->imageService->sync(
            $project,
            $request->file('image'),
            $validated['alt_ru'] ?? null,
            $validated['alt_en'] ?? null,
            $validated['mockup'] ?? null
        );

        return response()->json([
            'message' => 'Project updated successfully',
            'data' => $project->load('image')
        ]);
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return response()->json([
            'message' => 'Project deleted successfully'
        ]);
    }
}
