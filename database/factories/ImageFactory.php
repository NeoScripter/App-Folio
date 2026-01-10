<?php

namespace Database\Factories;

use App\Models\Review;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Image>
 */
class ImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'dk_webp' => fake()->url(),
            'dk_avif' => fake()->url(),
            'tb_webp' => fake()->url(),
            'tb_avif' => fake()->url(),
            'mb_webp' => fake()->url(),
            'mb_avif' => fake()->url(),
            'tiny' => fake()->url(),
            'alt_ru' => fake()->sentence(3),
            'alt_en' => fake()->sentence(3),
            'imageable_type' => $this->imageableType(...),
            'imageable_id' => Review::factory(),
        ];
    }

    protected function imageableType(array $values)
    {
        $type = $values['imageable_id'];
        $modelName = $type instanceof Factory ? $type->modelName() : $type::class;

        return (new $modelName)->getMorphClass();
    }
}
