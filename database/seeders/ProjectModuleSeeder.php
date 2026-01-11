<?php

namespace Database\Seeders;

use App\Enums\ProjectModuleType;
use App\Models\Image;
use App\Models\Project;
use App\Models\ProjectModule;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectModuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Project::all()->each(function ($project) {
            ProjectModule::factory([
                'order' => 1,
                'project_id' => $project->id,
                'type' => ProjectModuleType::ONLY_TEXT
            ])->create();
            ProjectModule::factory([
                'order' => 2,
                'project_id' => $project->id,
                'type' => ProjectModuleType::TWO_IMAGE_BLOCK
            ])->afterCreating(function ($module) {
                Image::factory()->create([
                    'imageable_id' => $module,
                    'type' => 'first',
                    'dk_webp' => 'models/project_modules/hor-1-dk.webp',
                    'dk_avif' => 'models/project_modules/hor-1-dk.avif',
                    'tb_webp' => 'models/project_modules/hor-1-tb.webp',
                    'tb_avif' => 'models/project_modules/hor-1-tb.avif',
                    'mb_webp' => 'models/project_modules/hor-1-mb.webp',
                    'mb_avif' => 'models/project_modules/hor-1-mb.avif',
                    'tiny' => 'models/project_modules/hor-1-dk-tiny.webp',
                ]);
                Image::factory()->create([
                    'imageable_id' => $module,
                    'type' => 'second',
                    'dk_webp' => 'models/project_modules/hor-2-dk.webp',
                    'dk_avif' => 'models/project_modules/hor-2-dk.avif',
                    'tb_webp' => 'models/project_modules/hor-2-tb.webp',
                    'tb_avif' => 'models/project_modules/hor-2-tb.avif',
                    'mb_webp' => 'models/project_modules/hor-2-mb.webp',
                    'mb_avif' => 'models/project_modules/hor-2-mb.avif',
                    'tiny' => 'models/project_modules/hor-2-dk-tiny.webp',
                ]);
            })->create();
            ProjectModule::factory([
                'order' => 3,
                'project_id' => $project->id,
                'type' => ProjectModuleType::ONE_IMAGE_SPLIT
            ])->afterCreating(function ($module) {
                    Image::factory()->create([
                        'imageable_id' => $module,
                        'type' => 'first',
                        'dk_webp' => 'models/project_modules/vertical-dk.webp',
                        'dk_avif' => 'models/project_modules/vertical-dk.avif',
                        'tb_webp' => 'models/project_modules/vertical-tb.webp',
                        'tb_avif' => 'models/project_modules/vertical-tb.avif',
                        'mb_webp' => 'models/project_modules/vertical-mb.webp',
                        'mb_avif' => 'models/project_modules/vertical-mb.avif',
                        'tiny' => 'models/project_modules/vertical-dk-tiny.webp',
                    ]);
                })->create();
            ProjectModule::factory([
                'order' => 4,
                'project_id' => $project->id,
                'type' => ProjectModuleType::TWO_IMAGE_SPLIT
            ])->afterCreating(function ($module) {
                Image::factory()->create([
                    'imageable_id' => $module,
                    'type' => 'first',
                    'dk_webp' => 'models/project_modules/hor-1-dk.webp',
                    'dk_avif' => 'models/project_modules/hor-1-dk.avif',
                    'tb_webp' => 'models/project_modules/hor-1-tb.webp',
                    'tb_avif' => 'models/project_modules/hor-1-tb.avif',
                    'mb_webp' => 'models/project_modules/hor-1-mb.webp',
                    'mb_avif' => 'models/project_modules/hor-1-mb.avif',
                    'tiny' => 'models/project_modules/hor-1-dk-tiny.webp',
                ]);
                Image::factory()->create([
                    'imageable_id' => $module,
                    'type' => 'second',
                    'dk_webp' => 'models/project_modules/hor-2-dk.webp',
                    'dk_avif' => 'models/project_modules/hor-2-dk.avif',
                    'tb_webp' => 'models/project_modules/hor-2-tb.webp',
                    'tb_avif' => 'models/project_modules/hor-2-tb.avif',
                    'mb_webp' => 'models/project_modules/hor-2-mb.webp',
                    'mb_avif' => 'models/project_modules/hor-2-mb.avif',
                    'tiny' => 'models/project_modules/hor-2-dk-tiny.webp',
                ]);
            })->create();
        });
    }
}
