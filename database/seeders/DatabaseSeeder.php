<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\News;
use App\Models\Program;
use App\Models\Setting;
use App\Models\Department;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create departments
        $departmentNames = ['IT', 'HR', 'Finance', 'Marketing', 'Operations', 'Sales'];
        foreach ($departmentNames as $name) {
            Department::firstOrCreate(
                ['name' => $name],
                ['slug' => Str::slug($name), 'description' => "$name Department"]
            );
        }

        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'department' => 'IT',
            'role' => 'Admin',
        ]);
        News::factory()->count(3)->create();
        Program::factory()->count(3)->create();
        Setting::create(['key' => 'site_name', 'value' => config('app.name')]);
    }
}
