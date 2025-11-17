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
        $query = Project::filter($filters);

        if (request()->filled('limit')) {
            return ProjectResource::collection(
                $query->get()
            );
        }

        return ProjectResource::collection(
            $query->paginate()
        );
    }

    public function show(Project $project)
    {
        return new ProjectResource($project);
    }
}
