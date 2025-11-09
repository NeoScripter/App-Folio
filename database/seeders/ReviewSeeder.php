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
                        'path' => 'models/reviews/review-' . $i . '.jpeg'
                    ]);
                })
                ->create();
        };
    }
}
