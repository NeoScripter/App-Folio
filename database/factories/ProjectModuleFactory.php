<?php

namespace Database\Factories;

use App\Enums\ProjectModuleType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProjectModule>
 */
class ProjectModuleFactory extends Factory
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
            'type' => ProjectModuleType::ONLY_TEXT,
            'heading_ru' => $fakerRu->words(3, true),
            'heading_en' => $fakerEn->words(3, true),
            'body_ru' => $fakerRu->words(50, true),
            'body_en' => $fakerEn->words(50, true),
        ];
    }
}
