<?php

namespace Database\Seeders;

use App\Enums\ProjectModuleType;
use App\Models\Category;
use App\Models\Image;
use App\Models\Project;
use App\Models\ProjectModule;
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

                    ProjectModule::factory(['order' => 1, 'project_id' => $project->id, 'type' => ProjectModuleType::ONLY_TEXT])->create();
                    ProjectModule::factory(['order' => 2, 'project_id' => $project->id, 'type' => ProjectModuleType::TWO_IMAGE_BLOCK])->afterCreating(function ($module) {
                        Image::factory()->create([
                            'imageable_id' => $module,
                            'type' => 'first',
                            'dk_webp' => 'models/project_modules/hor-1-dk.webp',
                            'dk_avif' => 'models/project_modules/hor-1-dk.webp',
                            'tb_webp' => 'models/project_modules/hor-1-tb.webp',
                            'tb_avif' => 'models/project_modules/hor-1-tb.webp',
                            'mb_webp' => 'models/project_modules/hor-1-mb.webp',
                            'mb_avif' => 'models/project_modules/hor-1-mb.avif',
                            'tiny' => 'models/project_modules/hor-1-dk-tiny.webp',
                        ]);
                        Image::factory()->create([
                            'imageable_id' => $module,
                            'type' => 'second',
                            'dk_webp' => 'models/project_modules/hor-2-dk.webp',
                            'dk_avif' => 'models/project_modules/hor-2-dk.webp',
                            'tb_webp' => 'models/project_modules/hor-2-tb.webp',
                            'tb_avif' => 'models/project_modules/hor-2-tb.webp',
                            'mb_webp' => 'models/project_modules/hor-2-mb.webp',
                            'mb_avif' => 'models/project_modules/hor-2-mb.avif',
                            'tiny' => 'models/project_modules/hor-2-dk-tiny.webp',
                        ]);
                    })->create();
                    ProjectModule::factory(['order' => 3, 'project_id' => $project->id, 'type' => ProjectModuleType::ONE_IMAGE_SPLIT])->afterCreating(function ($module) {
                        Image::factory()->create([
                            'imageable_id' => $module,
                            'type' => 'first',
                            'dk_webp' => 'models/project_modules/vertical-dk.webp',
                            'dk_avif' => 'models/project_modules/vertical-dk.webp',
                            'tb_webp' => 'models/project_modules/vertical-tb.webp',
                            'tb_avif' => 'models/project_modules/vertical-tb.webp',
                            'mb_webp' => 'models/project_modules/vertical-mb.webp',
                            'mb_avif' => 'models/project_modules/vertical-mb.avif',
                            'tiny' => 'models/project_modules/vertical-dk-tiny.webp',
                        ]);
                    })->create();
                    ProjectModule::factory(['order' => 4, 'project_id' => $project->id,'type' => ProjectModuleType::TWO_IMAGE_SPLIT])->afterCreating(function ($module) {
                        Image::factory()->create([
                            'imageable_id' => $module,
                            'type' => 'first',
                            'dk_webp' => 'models/project_modules/hor-1-dk.webp',
                            'dk_avif' => 'models/project_modules/hor-1-dk.webp',
                            'tb_webp' => 'models/project_modules/hor-1-tb.webp',
                            'tb_avif' => 'models/project_modules/hor-1-tb.webp',
                            'mb_webp' => 'models/project_modules/hor-1-mb.webp',
                            'mb_avif' => 'models/project_modules/hor-1-mb.avif',
                            'tiny' => 'models/project_modules/hor-1-dk-tiny.webp',
                        ]);
                        Image::factory()->create([
                            'imageable_id' => $module,
                            'type' => 'second',
                            'dk_webp' => 'models/project_modules/hor-2-dk.webp',
                            'dk_avif' => 'models/project_modules/hor-2-dk.webp',
                            'tb_webp' => 'models/project_modules/hor-2-tb.webp',
                            'tb_avif' => 'models/project_modules/hor-2-tb.webp',
                            'mb_webp' => 'models/project_modules/hor-2-mb.webp',
                            'mb_avif' => 'models/project_modules/hor-2-mb.avif',
                            'tiny' => 'models/project_modules/hor-2-dk-tiny.webp',
                        ]);
                    })->create();
                })
                ->create();
        };
    }
}
