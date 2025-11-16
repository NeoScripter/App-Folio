<?php

namespace Database\Seeders;

use App\Models\Stack;
use App\Support\StackFixtures;
use Illuminate\Database\Seeder;

class StackSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $stackData = StackFixtures::getFixtures();

        $stackData->each(function (array $raw, int $idx) {
            Stack::factory(
                [
                    'body_ru' => $raw['body'],
                    'body_en' => $raw['body'],
                    'image' => 'models/stacks/stack-' . ($idx + 1) . '.webp',
                ]
            )->create();
        });
    }
}

        // $stackData->each(function (array $raw, int $idx) {
        //     $bodyRu = $raw['body'];
        //     $bodyEn = $raw['body'];

        //     Stack::create([
        //         'body_ru' => $bodyRu,
        //         'body_en' => $bodyEn,
        //         'html_ru' => str($bodyRu)->markdown([
        //             'html_input' => 'strip',
        //             'allow_unsafe_links' => false,
        //             'max_nesting_level' => 5,
        //         ]),
        //         'html_en' => str($bodyEn)->markdown([
        //             'html_input' => 'strip',
        //             'allow_unsafe_links' => false,
        //             'max_nesting_level' => 5,
        //         ]),
        //         'image' => 'models/stacks/stack-' . ($idx + 1) . '.webp',
        //     ]);
        // });

