<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Stack>
 */
class StackFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'image' => fake()->url(),
            'body_en' => fake()->word(),
            'body_ru' => fake()->word(),
            'alt_en' => fake()->word(),
            'alt_ru' => fake()->word(),
        ];
    }
}
