<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProjectModule\CreateProjectModuleRequest;
use App\Http\Requests\ProjectModule\UpdateProjectModuleRequest;
use App\Models\ProjectModule;
use App\Services\ImageService;

class ProjectModuleController extends Controller
{
    public function __construct(
        private ImageService $imageService,
    ) {}

    public function store(CreateProjectModuleRequest $request)
    {
        $validated = $request->validated();

        $module = ProjectModule::create(
            $request->safe()->except([
                'first_image',
                'second_image',
                'first_alt_en',
                'first_alt_ru',
                'second_alt_en',
                'second_alt_ru',
            ])
        );

        if ($request->hasFile('first_image')) {
            $this->imageService->sync(
                $module,
                $request->file('first_image'),
                $validated['first_alt_ru'] ?? null,
                $validated['first_alt_en'] ?? null,
            );
        }

        if ($request->hasFile('second_image')) {
            $this->imageService->sync(
                $module,
                $request->file('second_image'),
                $validated['second_alt_ru'] ?? null,
                $validated['second_alt_en'] ?? null,
            );
        }

        return response()->json([
            'message' => 'Project module created successfully',
        ], 201);
    }

    public function update(UpdateProjectModuleRequest $request, ProjectModule $module)
    {
        $validated = $request->validated();

        $module->update(
            $request->safe()->except([
                'first_image',
                'second_image',
                'first_alt_en',
                'first_alt_ru',
                'second_alt_en',
                'second_alt_ru',
            ])
        );

        if ($request->hasFile('first_image')) {
            $this->imageService->sync(
                $module,
                $request->file('first_image'),
                $validated['first_alt_ru'] ?? null,
                $validated['first_alt_en'] ?? null,
            );
        }

        if ($request->hasFile('second_image')) {
            $this->imageService->sync(
                $module,
                $request->file('second_image'),
                $validated['second_alt_ru'] ?? null,
                $validated['second_alt_en'] ?? null,
            );
        }

        return response()->json([
            'message' => 'Project module updated successfully',
        ]);
    }

    public function destroy(ProjectModule $module)
    {
        $module->delete();

        return response()->json([
            'message' => 'Project module deleted successfully',
        ]);
    }
}
