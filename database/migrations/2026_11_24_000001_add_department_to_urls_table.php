<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('urls', 'department')) {
            Schema::table('urls', function (Blueprint $table) {
                $table->string('department', 255)->nullable()->after('status');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('urls', 'department')) {
            Schema::table('urls', function (Blueprint $table) {
                $table->dropColumn('department');
            });
        }
    }
};
