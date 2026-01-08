<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Image;
use App\Models\Project;
use App\Models\Technology;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 24; $i++) {

            Project::factory()
                ->afterCreating(function ($project) use ($i) {
                    Image::factory()->create([
                        'imageable_id' => $project,
                        'path' => 'models/projects/project-' . $i % 7 . '.png'
                    ]);

                    $techIds = Technology::inRandomOrder()
                        ->limit(rand(4, 6))
                        ->get()
                        ->pluck('id');

                    $categoryId = Category::inRandomOrder()
                        ->limit(1)
                        ->pluck('id')
                        ->first();

                    $project->technologies()->attach($techIds);
                    $project->category()->associate($categoryId);
                    $project->save();
                })
                ->create();
        };
    }
}
