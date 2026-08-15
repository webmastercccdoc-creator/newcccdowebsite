<?php

namespace Tests\Feature;

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

    protected function assertUploadedImagePathPattern(): string
    {
        $image = \DB::table('article_images')->first();

        $this->assertNotNull($image);
        $this->assertStringContainsString('storage/news_images/', $image->image_path);

        return basename($image->image_path);
    }
}
