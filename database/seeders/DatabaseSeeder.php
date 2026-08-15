<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\News;
use App\Models\Program;
use App\Models\Setting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        News::factory()->count(3)->create();
        Program::factory()->count(3)->create();
        Setting::create(['key' => 'site_name', 'value' => config('app.name')]);
    }
}
