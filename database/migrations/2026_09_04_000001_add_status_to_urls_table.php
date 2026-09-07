<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('urls', 'status')) {
            Schema::table('urls', function (Blueprint $table) {
                $table->string('status', 20)->default('pending')->after('clicks');
            });
        }

        DB::table('urls')->update(['status' => 'pending']);
    }

    public function down(): void
    {
        if (Schema::hasColumn('urls', 'status')) {
            Schema::table('urls', function (Blueprint $table) {
                $table->dropColumn('status');
            });
        }
    }
};
