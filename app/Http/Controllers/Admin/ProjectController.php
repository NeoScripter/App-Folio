<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\CreateProjectRequest;
use App\Http\Requests\Project\UpdateProjectRequest;
use App\Models\Project;
use App\Models\Technology;
use App\Services\ImageService;
use App\Services\Project\ProjectCategoryService;
use App\Services\Project\ProjectTechnologyService;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function __construct(
        private ImageService $imageService,
        private ProjectCategoryService $categoryService,
        private ProjectTechnologyService $technologyService
    ) {}

    public function store(CreateProjectRequest $request)
    {
        $validated = $request->validated();

        $project = Project::create($request->safe()
            ->except(['image', 'alt_ru', 'alt_en', 'mockup', 'category_ru', 'category_en']));

        $this->technologyService->sync(
            $project,
            $validated['technologies'] ?? []
        );

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

    public function update(UpdateProjectRequest $request, Project $project)
    {
        $validated = $request->validated();

        $project->update($request->safe()->except(['image', 'technologies', 'alt_ru', 'alt_en', 'mockup', 'category_ru', 'category_en']));

        $this->technologyService->sync(
            $project,
            $validated['technologies'] ?? []
        );

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
