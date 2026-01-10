<?php

namespace Database\Seeders;

use App\Models\Image;
use App\Models\Review;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 7; $i++) {

            Review::factory()
                ->afterCreating(function ($review) use ($i) {
                    Image::factory()->create([
                        'imageable_id' => $review,
                        'dk_webp' => 'models/reviews/review-' . $i . '.jpeg',
                        'dk_avif'  => 'models/reviews/review-' . $i . '.jpeg',
                        'tb_webp'  => 'models/reviews/review-' . $i . '.jpeg',
                        'tb_avif'  => 'models/reviews/review-' . $i . '.jpeg',
                        'mb_webp'  => 'models/reviews/review-' . $i . '.jpeg',
                        'mb_avif'   => 'models/reviews/review-' . $i . '.jpeg',
                        'tiny'   => 'models/reviews/review-' . $i . '.jpeg',
                    ]);
                })
                ->create();
        };
    }
}
