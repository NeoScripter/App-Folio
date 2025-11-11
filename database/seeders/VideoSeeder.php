<?php

namespace Database\Seeders;

use App\Models\Image;
use App\Models\Video;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VideoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 7; $i++) {

            Video::factory()
                ->afterCreating(function ($video) {
                    Image::factory()->create([
                        'imageable_id' => $video,
                        'path' => 'models/videos/video-1.png'
                    ]);
                })
                ->create();
        };
    }
}
