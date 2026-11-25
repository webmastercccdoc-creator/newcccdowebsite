<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('urls')
            ->whereNull('department')
            ->orWhereRaw("TRIM(department) = ''")
            ->update(['department' => 'No department']);

        if (Schema::hasTable('departments')) {
            $exists = DB::table('departments')
                ->whereRaw('LOWER(name) = ?', ['no department'])
                ->orWhere('slug', 'no-department')
                ->exists();

            if (!$exists) {
                DB::table('departments')->insert([
                    'name' => 'No department',
                    'slug' => 'no-department',
                    'description' => 'URLs without an assigned department.',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }

    public function down(): void
    {
        DB::table('urls')
            ->where('department', 'No department')
            ->update(['department' => null]);

        if (Schema::hasTable('departments')) {
            $departmentId = DB::table('departments')
                ->where('slug', 'no-department')
                ->value('id');

            if ($departmentId) {
                if (Schema::hasTable('user_departments')) {
                    DB::table('user_departments')
                        ->where('department_id', $departmentId)
                        ->delete();
                }
                DB::table('departments')->where('id', $departmentId)->delete();
            }
        }
    }
};
