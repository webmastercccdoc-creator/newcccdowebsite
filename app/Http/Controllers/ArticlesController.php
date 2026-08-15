<?php

namespace App\Http\Controllers;

use App\Models\NewsArticle;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ArticlesController extends Controller
{
    /**
     * Display a listing of articles.
     */
    public function index()
    {
        $articles = NewsArticle::select(
            'id',
            'title',
            'date',
            'department',
            'status',
            'created_by'
        )
        ->orderByDesc('date')
        ->get()
        ->map(function ($article) {
            $date = $article->date;
            $status = $article->status ?? 'pending';
            
            return [
                'id' => $article->id,
                'title' => $article->title,
                'department' => $article->department,
                'status' => ucfirst($status),
                'date' => $date ? $date->format('Y-m-d') : now()->format('Y-m-d'),
                'created_by' => $article->created_by,
            ];
        });

        $departments = DB::table('departments')
            ->select('id', 'name', 'slug')
            ->orderBy('name')
            ->get();

        return Inertia::render('admin/articles/Articles', [
            'articles' => $articles,
            'departments' => $departments,
        ]);
    }

    /**
     * Display a listing of articles for approval (pending articles only).
     */
    public function approve()
    {
        $articles = NewsArticle::select(
            'id',
            'title',
            'date',
            'department',
            'status',
            'created_by'
        )
        ->orderByDesc('date')
        ->get()
        ->map(function ($article) {
            $date = $article->date;
            $status = $article->status ?? 'pending';
            
            return [
                'id' => $article->id,
                'title' => $article->title,
                'department' => $article->department,
                'status' => ucfirst($status),
                'date' => $date ? $date->format('Y-m-d') : now()->format('Y-m-d'),
                'created_by' => $article->created_by,
            ];
        });

        return Inertia::render('admin/articles/ApproveArticles', [
            'articles' => $articles,
        ]);
    }

    /**
     * Store a newly created article in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'department' => ['nullable', 'string', 'max:255'],
            'status' => ['nullable', 'string'],
            'date' => ['nullable', 'date'],
            'sdg' => ['required', 'array', 'min:1'],
            'sdg.*' => ['integer', 'min:1', 'max:17'],
            'images' => ['sometimes', 'array', 'min:1'],
            'images.*' => ['image', 'mimes:jpeg,png,gif,webp', 'max:5120'],
        ]);

        $article = NewsArticle::create([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'department' => $validated['department'] ?? 'No department',
            'date' => $validated['date'] ?? now()->toDateString(),
            'status' => $this->normalizeArticleStatus($validated['status'] ?? 'pending'),
            'created_by' => auth()->id() ?? 1,
        ]);

        $sdgNumbers = $request->input('sdg', []);
        if (!is_array($sdgNumbers)) {
            $sdgNumbers = [$sdgNumbers];
        }

        foreach ($sdgNumbers as $sdgNumber) {
            if ($sdgNumber === null || $sdgNumber === '') {
                continue;
            }

            DB::table('article_sdg_associations')->insert([
                'article_id' => $article->id,
                'sdg_number' => (int) $sdgNumber,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $imageFiles = $request->file('images', []);
        $savedImages = [];

        if (!empty($imageFiles)) {
            foreach ($imageFiles as $index => $file) {
                $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
                $safeFileName = Str::slug($originalName) ?: 'article';
                $fileName = time() . '_' . Str::random(10) . '_' . $safeFileName . '.' . $file->getClientOriginalExtension();

                $storedPath = $file->storeAs('news_images', $fileName, 'public');

                if ($storedPath === false) {
                    throw new \RuntimeException('Unable to store article image.');
                }

                $imageRecord = [
                    'article_id' => $article->id,
                    'image_path' => 'storage/' . $storedPath,
                    'alt_text' => $article->title . ' - Image ' . ($index + 1),
                    'sort_order' => $index + 1,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];

                DB::table('article_images')->insert($imageRecord);
                $savedImages[] = $imageRecord;
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Article created successfully.',
            'article' => $article,
            'images' => $savedImages,
        ], 201);
    }

    protected function normalizeArticleStatus(?string $status): string
    {
        if ($status === 'Draft') {
            return 'pending';
        }

        return in_array($status, ['pending', 'approved', 'rejected'], true)
            ? $status
            : 'pending';
    }

    /**
     * Display the specified article.
     */
    public function show(Request $request, NewsArticle $article)
    {
        if ($request->expectsJson() || $request->ajax() || $request->wantsJson()) {
            $sdgValues = DB::table('article_sdg_associations')
                ->where('article_id', $article->id)
                ->orderBy('sdg_number')
                ->pluck('sdg_number')
                ->map(fn ($sdgNumber) => 'sdg' . (int) $sdgNumber)
                ->values()
                ->all();

            $images = DB::table('article_images')
                ->where('article_id', $article->id)
                ->orderBy('sort_order')
                ->orderBy('id')
                ->get();

            $articleData = [
                'id' => $article->id,
                'title' => $article->title,
                'content' => $article->content,
                'department' => $article->department,
                'date' => $article->date ? $article->date->format('Y-m-d') : null,
                'status' => $article->status,
                'sdg' => $sdgValues,
                'images' => $images->pluck('image_path')->map(function ($path) {
                    if (empty($path)) {
                        return null;
                    }

                    return '/' . ltrim($path, '/');
                })->filter()->values()->all(),
                'imagePreviews' => $images->pluck('image_path')->map(function ($path) {
                    if (empty($path)) {
                        return null;
                    }

                    return '/' . ltrim($path, '/');
                })->filter()->values()->all(),
            ];

            return response()->json([
                'article' => $articleData,
            ]);
        }

        return Inertia::render('admin/ArticlesShow', [
            'article' => $article,
        ]);
    }

    /**
     * Update the specified article in storage.
     */
    public function update(Request $request, NewsArticle $article)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'department' => ['nullable', 'string', 'max:255'],
            'status' => ['nullable', 'string'],
            'date' => ['nullable', 'date'],
            'sdg' => ['required', 'array', 'min:1'],
            'sdg.*' => ['integer', 'min:1', 'max:17'],
            'images' => ['sometimes', 'array'],
            'images.*' => ['image', 'mimes:jpeg,png,gif,webp', 'max:5120'],
            'keep_existing_images_count' => ['sometimes', 'integer', 'min:0', 'max:3'],
        ]);

        // Update article fields
        $article->update([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'department' => $validated['department'] ?? $article->department,
            'date' => $validated['date'] ?? $article->date,
            'status' => $this->normalizeArticleStatus($validated['status'] ?? $article->status),
        ]);

        // Update SDG associations
        DB::table('article_sdg_associations')->where('article_id', $article->id)->delete();
        
        $sdgNumbers = $request->input('sdg', []);
        if (!is_array($sdgNumbers)) {
            $sdgNumbers = [$sdgNumbers];
        }

        foreach ($sdgNumbers as $sdgNumber) {
            if ($sdgNumber === null || $sdgNumber === '') {
                continue;
            }

            DB::table('article_sdg_associations')->insert([
                'article_id' => $article->id,
                'sdg_number' => (int) $sdgNumber,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Handle image updates if new images are provided
        $imageFiles = $request->file('images', []);
        $keepExistingCount = (int) $request->input('keep_existing_images_count', 0);
        $savedImages = [];

        // If images are provided and keep_existing_images_count is less than current images,
        // delete the removed images
        if (isset($imageFiles) || $keepExistingCount < DB::table('article_images')->where('article_id', $article->id)->count()) {
            $currentImages = DB::table('article_images')
                ->where('article_id', $article->id)
                ->orderBy('sort_order')
                ->get();

            // Delete images beyond the keep count
            foreach ($currentImages as $index => $image) {
                if ($index >= $keepExistingCount) {
                    Storage::disk('public')->delete(str_replace('storage/', '', $image->image_path));
                    DB::table('article_images')->where('id', $image->id)->delete();
                }
            }
        }

        // Upload new images
        if (!empty($imageFiles) && is_array($imageFiles)) {
            $currentImageCount = DB::table('article_images')
                ->where('article_id', $article->id)
                ->count();

            foreach ($imageFiles as $index => $file) {
                $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
                $safeFileName = Str::slug($originalName) ?: 'article';
                $fileName = time() . '_' . Str::random(10) . '_' . $safeFileName . '.' . $file->getClientOriginalExtension();

                $storedPath = $file->storeAs('news_images', $fileName, 'public');

                if ($storedPath === false) {
                    throw new \RuntimeException('Unable to store article image.');
                }

                $imageRecord = [
                    'article_id' => $article->id,
                    'image_path' => 'storage/' . $storedPath,
                    'alt_text' => $article->title . ' - Image ' . ($currentImageCount + $index + 1),
                    'sort_order' => $currentImageCount + $index + 1,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];

                DB::table('article_images')->insert($imageRecord);
                $savedImages[] = $imageRecord;
            }
        }

        // Return JSON response for AJAX requests
        if ($request->expectsJson() || $request->ajax() || $request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Article updated successfully.',
                'article' => $article,
                'images' => $savedImages,
            ]);
        }

        return redirect()->route('admin.articles')->with('success', 'Article updated successfully.');
    }

    /**
     * Remove the specified article from storage.
     */
    public function destroy(NewsArticle $article)
    {
        $article->delete();

        return redirect()->route('admin.articles')->with('success', 'Article deleted successfully.');
    }

    /**
     * Approve an article (change status to approved).
     */
    public function approveArticle(Request $request, NewsArticle $article)
    {
        $validated = $request->validate([
            'status' => ['nullable', 'string'],
        ]);

        // Update article status to approved
        $article->update([
            'status' => 'approved',
        ]);

        // Return JSON response for AJAX requests
        if ($request->expectsJson() || $request->ajax() || $request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Article approved successfully.',
                'article' => $article,
            ]);
        }

        return redirect()->route('admin.approve-articles')->with('success', 'Article approved successfully.');
    }

    /**
     * Reject an article (change status to rejected).
     */
    public function rejectArticle(Request $request, NewsArticle $article)
    {
        $validated = $request->validate([
            'status' => ['nullable', 'string'],
        ]);

        // Update article status to rejected
        $article->update([
            'status' => 'rejected',
        ]);

        // Return JSON response for AJAX requests
        if ($request->expectsJson() || $request->ajax() || $request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Article rejected successfully.',
                'article' => $article,
            ]);
        }

        return redirect()->route('admin.approve-articles')->with('success', 'Article rejected successfully.');
    }
}
