<?php

namespace App\Services\Project;

use App\Models\Project;
use App\Models\Technology;
use Illuminate\Support\Collection;

class ProjectTechnologyService
{
    public function sync(Project $project, array $technologies): void
    {
        if (empty($technologies)) {
            $this->detachAll($project);
            return;
        }

        $technologyIds = collect($technologies)
            ->map(fn($name) => trim($name))
            ->filter(fn($name) => !empty($name))
            ->unique()
            ->map(fn($name) => $this->findOrCreate($name))
            ->pluck('id');

        $previousTechnologies = $project->technologies;

        $project->technologies()->sync($technologyIds);

        $this->cleanupOrphaned($previousTechnologies);
    }

    private function detachAll(Project $project): void
    {
        $previousTechnologies = $project->technologies;
        $project->technologies()->detach();
        $this->cleanupOrphaned($previousTechnologies);
    }

    private function findOrCreate(string $name): Technology
    {
        return Technology::firstOrCreate(['name' => $name]);
    }

    private function cleanupOrphaned(Collection $technologies): void
    {
        foreach ($technologies as $technology) {
            if (!$technology->projects()->exists()) {
                $technology->delete();
            }
        }
    }
}
