<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Video>
 */
class VideoFactory extends Factory
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
            'url' => 'https://www.youtube.com/embed/MVj1Yqak6bY?si=qg0LceeIokh9hS9_',
            'title_ru' => implode(' ', $fakerRu->words(4)),
            'title_en' => implode(' ', $fakerEn->words(4)),
        ];
    }
}
