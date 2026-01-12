<?php

namespace Database\Seeders;

use App\Models\Technology;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TechnologySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $names = collect(['React', 'PHP', 'Laravel', 'TypeScript', 'HTML', 'CSS', 'Vue']);

        $names->each(function ($name) {
            Technology::factory(['name' => $name])->create();
        });
    }
}
