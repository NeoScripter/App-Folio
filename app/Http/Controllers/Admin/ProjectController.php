<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Image;
use App\Models\Project;
use App\Services\Project\ProjectCategoryService;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class ProjectController extends Controller
{
    public function store(Request $request, ProjectCategoryService $categoryService)
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

        $project = Project::create(Arr::except($validated, ['image', 'alt_ru', 'alt_en', 'mockup', 'category_ru', 'category_en']));

        $categoryService->sync(
            $project,
            $validated['category_en'] ?? null,
            $validated['category_ru'] ?? null
        );

        if ($request->hasFile('image')) {
            Image::insertMockupAndAttachTo(
                $project,
                $request->file('image'),
                $validated['alt_ru'],
                $validated['alt_en'],
                $validated['mockup']
            );
        }

        return response()->json([
            'message' => 'Project created successfully',
            'data' => $project->load('image')
        ], 201);
    }

    public function update(Request $request, Project $project, ProjectCategoryService $categoryService)
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

        $project->update(Arr::except($validated, ['image', 'alt_ru', 'alt_en', 'mockup', 'category_ru', 'category_en']));

        $categoryService->sync(
            $project,
            $validated['category_en'] ?? null,
            $validated['category_ru'] ?? null
        );
        if ($request->hasFile('image')) {
            $project->image?->delete();
            Image::insertMockupAndAttachTo(
                $project,
                $request->file('image'),
                $validated['alt_ru'],
                $validated['alt_en'],
                $validated['mockup']
            );
        } elseif ($project->image && ($validated['alt_ru'] ?? $validated['alt_en'] ?? false)) {
            $project->image->update(Arr::only($validated, ['alt_ru', 'alt_en']));
        }

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
