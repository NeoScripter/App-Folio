<?php

namespace App\Services\Project;

use App\Models\Category;
use App\Models\Project;
use Illuminate\Support\Str;

class ProjectCategoryService
{
    public function sync(Project $project, ?string $en, ?string $ru): void
    {
        $en = $en !== null ? Str::trim($en) : null;
        $ru = $ru !== null ? Str::trim($ru) : null;

        $previousCategory = $project->category;

        if (!$en && !$ru) {
            $project->update(['category_id' => null]);
            $this->deleteIfOrphaned($previousCategory);
            return;
        }

        $category = Category::firstOrCreate(
            [
                'name_en' => $en,
                'name_ru' => $ru,
            ]
        );

        if ($previousCategory?->id === $category->id) {
            return;
        }

        $project->update(['category_id' => $category->id]);

        $this->deleteIfOrphaned($previousCategory);
    }

    private function deleteIfOrphaned(?Category $category): void
    {
        if (!$category) {
            return;
        }

        if (!$category->projects()->exists()) {
            $category->delete();
        }
    }
}
