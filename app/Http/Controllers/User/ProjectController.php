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
            return ProjectResource::collection(
                $query->limit($limit)->get()
            );
        }

        return ProjectResource::collection(
            $query->paginate(7)
        );
    }

    public function show(Project $project)
    {
        $project->load(['category', 'technologies']);
        return new ProjectResource($project);
    }
}
