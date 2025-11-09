<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $fakerRu = \Faker\Factory::create('ru_RU');
        $fakerEn = \Faker\Factory::create('en_US');

        return [
            'content_ru' => $fakerRu->sentence(3),
            'content_en' => $fakerEn->sentence(3),
            'name_ru' => $fakerRu->firstName(),
            'name_en' => $fakerEn->firstName(),
        ];
    }
}
