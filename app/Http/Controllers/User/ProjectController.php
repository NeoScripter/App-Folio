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
        $projects = Project::filter($filters)
            ->with(['category', 'technologies'])
            ->when(
                !request()->filled('latest'),
                fn($q) => $q->orderByDesc('order')
            );

        if (request()->filled('limit')) {
            return $projects->get()->toResourceCollection();
        }

        return $projects->paginate(7)->toResourceCollection();
    }

    public function show(Project $project)
    {
        return new ProjectResource(
            $project->load([
                'category',
                'technologies',
                'modules' => fn($q) => $q->orderBy('order')
            ])
        );
    }
}
