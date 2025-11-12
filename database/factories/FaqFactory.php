<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Faq>
 */
class FaqFactory extends Factory
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
            'content_ru' => $fakerRu->realText(200),
            'content_en' => $fakerEn->realText(200),
            'title_ru' => implode(' ', $fakerRu->words(4)),
            'title_en' => implode(' ', $fakerEn->words(4)),
        ];
    }
}
