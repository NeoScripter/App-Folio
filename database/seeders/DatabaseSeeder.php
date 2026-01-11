<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@gmail.com',
        ]);

        $this->call([
            ReviewSeeder::class,
            VideoSeeder::class,
            FaqSeeder::class,
            TechnologySeeder::class,
            CategorySeeder::class,
            ProjectSeeder::class,
            StackSeeder::class,
            ProjectModuleSeeder::class,
        ]);
    }
}
