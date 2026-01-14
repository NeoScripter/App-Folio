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

        $this->imageService->syncMultiple($module, [
            'first_image' => [
                'file' => $request->file('first_image'),
                'alt_ru' => $validated['first_alt_ru'] ?? null,
                'alt_en' => $validated['first_alt_en'] ?? null,
            ],
            'second_image' => [
                'file' => $request->file('second_image'),
                'alt_ru' => $validated['second_alt_ru'] ?? null,
                'alt_en' => $validated['second_alt_en'] ?? null,
            ],
        ]);

        return response()->json([
            'message' => 'Project module created successfully',
        ], 201);
    }

    public function update(UpdateProjectModuleRequest $request, int $id)
    {
        $validated = $request->validated();
        $module = ProjectModule::findOrFail($id);

        if (($new = $validated['order'] ?? null) !== null && $new !== $module->order) {
            ProjectModule::where('project_id', $module->project_id)
                ->where('order', $new)
                ->whereKeyNot($module->id)
                ->update(['order' => $module->order]);
        }

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

        $this->imageService->syncMultiple($module, [
            'first_image' => [
                'file' => $request->file('first_image'),
                'alt_ru' => $validated['first_alt_ru'] ?? null,
                'alt_en' => $validated['first_alt_en'] ?? null,
            ],
            'second_image' => [
                'file' => $request->file('second_image'),
                'alt_ru' => $validated['second_alt_ru'] ?? null,
                'alt_en' => $validated['second_alt_en'] ?? null,
            ],
        ]);

        return response()->json([
            'message' => 'Project module updated successfully',
        ]);
    }

    public function destroy(int $id)
    {
        $module = ProjectModule::find($id);
        $module->delete();

        return response()->json([
            'message' => 'Project module deleted successfully',
        ]);
    }
}
