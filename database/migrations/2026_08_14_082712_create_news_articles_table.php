<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (Schema::hasTable('news_articles')) {
            if (Schema::hasTable('article_sdg_associations')) {
                $foreignKeyExists = DB::selectOne("SELECT 1 FROM information_schema.KEY_COLUMN_USAGE WHERE CONSTRAINT_SCHEMA = DATABASE() AND TABLE_NAME = 'article_sdg_associations' AND CONSTRAINT_NAME = 'article_sdg_associations_article_id_foreign'");

                if ($foreignKeyExists) {
                    DB::statement('ALTER TABLE `article_sdg_associations` DROP FOREIGN KEY `article_sdg_associations_article_id_foreign`');
                }
            }

            DB::statement('ALTER TABLE `news_articles` MODIFY `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT');

            if (Schema::hasTable('article_sdg_associations')) {
                DB::statement('DELETE associations FROM `article_sdg_associations` associations LEFT JOIN `news_articles` articles ON articles.`id` = associations.`article_id` WHERE articles.`id` IS NULL');
                DB::statement('ALTER TABLE `article_sdg_associations` ADD CONSTRAINT `article_sdg_associations_article_id_foreign` FOREIGN KEY (`article_id`) REFERENCES `news_articles` (`id`) ON DELETE CASCADE');
            }

            return;
        }

        Schema::create('news_articles', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news_articles');
    }
};
