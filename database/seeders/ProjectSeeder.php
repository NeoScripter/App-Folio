<?php

namespace Database\Seeders;

use App\Models\Image;
use App\Models\Project;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 12; $i++) {

            Project::factory()
                ->afterCreating(function ($project) use ($i) {
                    Image::factory()->create([
                        'imageable_id' => $project,
                        'path' => 'models/projects/project-'. $i % 7 .'.png'
                    ]);
                })
                ->create();
        };
    }
}
