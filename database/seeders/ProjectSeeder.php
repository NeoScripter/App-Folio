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

            Project::factory([
                'order' => $i * 10
            ])
                ->afterCreating(function ($project) use ($i) {
                    Image::factory()->create([
                        'imageable_id' => $project,
                        'dk_webp' => 'models/projects/project-' . max(1, $i % 7) . '-dk.webp',
                        'dk_avif' => 'models/projects/project-' . max(1, $i % 7) . '-dk.avif',
                        'tb_webp' => 'models/projects/project-' . max(1, $i % 7) . '-tb.webp',
                        'tb_avif' => 'models/projects/project-' . max(1, $i % 7) . '-tb.avif',
                        'mb_webp' => 'models/projects/project-' . max(1, $i % 7) . '-mb.webp',
                        'mb_avif' => 'models/projects/project-' . max(1, $i % 7) . '-mb.avif',
                        'tiny' => 'models/projects/project-' . max(1, $i % 7) . '-dk-tiny.webp',
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
