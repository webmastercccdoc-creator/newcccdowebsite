<?php

namespace Tests\Feature;

use App\Models\Department;
use App\Models\NewsArticle;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class ArticlesStoreTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_stores_article_images_in_public_storage_and_sdg_associations(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/admin/articles', [
            'title' => 'Clean water project',
            'content' => 'This article is about clean water and sanitation.',
            'department' => 'Research',
            'date' => '2026-08-14',
            'status' => 'Draft',
            'sdg' => [6, 13],
            'images' => [
                UploadedFile::fake()->image('water-article.jpg', 1200, 900),
            ],
        ]);

        $response->assertStatus(201);

        $this->assertDatabaseHas('article_sdg_associations', [
            'sdg_number' => 6,
        ]);

        $this->assertDatabaseHas('article_sdg_associations', [
            'sdg_number' => 13,
        ]);

        $this->assertDatabaseHas('article_images', [
            'image_path' => 'storage/news_images/' . $this->assertUploadedImagePathPattern(),
        ]);
    }

    public function test_it_updates_article_when_sdg_values_are_sent_in_form_format(): void
    {
        $user = User::factory()->create();
        $article = \App\Models\NewsArticle::factory()->create([
            'title' => 'Original title',
            'content' => 'Original content',
            'department' => 'Research',
            'date' => '2026-08-14',
            'status' => 'pending',
            'created_by' => $user->id,
        ]);

        DB::table('article_sdg_associations')->insert([
            'article_id' => $article->id,
            'sdg_number' => 6,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $response = $this->actingAs($user)->put('/admin/articles/' . $article->id, [
            'title' => 'Updated title',
            'content' => 'Updated content about clean water and climate action.',
            'department' => 'Research',
            'date' => '2026-08-15',
            'status' => 'approved',
            'sdg' => ['sdg6', 'sdg13'],
            'keep_existing_images_count' => 0,
        ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('article_sdg_associations', [
            'article_id' => $article->id,
            'sdg_number' => 6,
        ]);

        $this->assertDatabaseHas('article_sdg_associations', [
            'article_id' => $article->id,
            'sdg_number' => 13,
        ]);
    }

    public function test_user_articles_are_filtered_using_department_slug(): void
    {
        $user = User::factory()->create();

        $department = Department::create([
            'name' => 'Research and Extension',
            'slug' => 'research-extension',
            'description' => 'Research department',
        ]);

        $user->departments()->attach($department->id);

        $article = NewsArticle::factory()->create([
            'title' => 'Slug-based department article',
            'content' => 'This article is assigned by department slug.',
            'department' => 'research-extension',
            'date' => '2026-08-14',
            'status' => 'approved',
            'created_by' => $user->id,
        ]);

        $response = $this->actingAs($user)->getJson('/user/articles');

        $response->assertOk()
            ->assertJsonPath('articles.0.id', $article->id)
            ->assertJsonPath('articles.0.title', 'Slug-based department article');
    }

    protected function assertUploadedImagePathPattern(): string
    {
        $image = \DB::table('article_images')->first();

        $this->assertNotNull($image);
        $this->assertStringContainsString('storage/news_images/', $image->image_path);

        return basename($image->image_path);
    }
}
