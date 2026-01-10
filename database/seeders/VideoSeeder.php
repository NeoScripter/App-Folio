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
                        'dk_webp' => 'models/videos/video-1.png',
                        'tb_webp' => 'models/videos/video-1.png',
                        'mb_webp' => 'models/videos/video-1.png',
                        'dk_avif' => 'models/videos/video-1.png',
                        'tb_avif' => 'models/videos/video-1.png',
                        'mb_avif' => 'models/videos/video-1.png',
                        'tiny' => 'models/videos/video-1.png',
                    ]);
                })
                ->create();
        };
    }
}
