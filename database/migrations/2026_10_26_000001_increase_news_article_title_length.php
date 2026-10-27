<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('news_articles') && Schema::hasColumn('news_articles', 'title')) {
            Schema::table('news_articles', function (Blueprint $table) {
                $table->string('title', 500)->change();
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('news_articles') && Schema::hasColumn('news_articles', 'title')) {
            Schema::table('news_articles', function (Blueprint $table) {
                $table->string('title', 255)->change();
            });
        }
    }
};
