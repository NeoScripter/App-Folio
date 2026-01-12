<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Filters\ProjectFilter;
use App\Http\Resources\ProjectResource;
use App\Models\Project;

class ProjectController extends Controller
{
    public function index(ProjectFilter $filters)
    {

        $query = Project::filter($filters)
            ->with(['category', 'technologies']);

        if (request()->filled('limit')) {
            $limit = request()->integer('limit');

            if (request()->filled('exclude')) {
                $excluded = request()->integer('exclude');
                $query->where('id', '!=', $excluded);
            }
            return ProjectResource::collection(
                $query->orderBy('order', 'desc')
                    ->limit($limit)
                    ->get()
            );
        }
        if (request()->filled('latest')) {
            $query->latest();
        } else {
            $query->orderBy('order', 'desc');
        }
        if (request()->filled('search')) {
            $search = request()->string('search');
            $query->where(function ($q) use ($search) {
                $q->whereRaw('title_ru LIKE ?', ["%{$search}%"])
                    ->orWhereRaw('title_en LIKE ?', ["%{$search}%"])
                    ->orWhereRaw('description_en LIKE ?', ["%{$search}%"])
                    ->orWhereRaw('description_ru LIKE ?', ["%{$search}%"]);
            });
        }

        return ProjectResource::collection(
            $query->paginate(7)
        );
    }

    public function show(Project $project)
    {
        $project->load(['category', 'technologies', 'modules' => fn($q) => $q->orderBy('order')]);
        return new ProjectResource($project);
    }
}
