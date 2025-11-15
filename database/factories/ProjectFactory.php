<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
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
            'title_ru' => $fakerRu->realText(15),
            'title_en' => $fakerEn->realText(15),
            'description_ru' => $fakerRu->realText(200),
            'description_en' => $fakerEn->realText(200),
            'link' => $fakerRu->url(),
        ];
    }
}
