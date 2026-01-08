<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $names = collect(['Application', 'Website', 'Landing', 'Game', 'Store']);

        $names->each(function ($name) {
            Category::factory(['name_en' => $name, 'name_ru' => $name])->create();
        });
    }
}
