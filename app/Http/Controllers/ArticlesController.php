<?php

namespace App\Http\Controllers;

use App\Models\NewsArticle;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
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
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login');
        }

        // Match department access using the department slug column, not the display name.
        $userDepartments = $user->departments()
            ->pluck('departments.slug')
            ->toArray();

        $articles = NewsArticle::select(
            'id',
            'title',
            'content',
            'date',
            'department',
            'status',
            'created_by'
        )
        ->where('status', 'approved')
        ->orderByDesc('date')
        ->get()
        ->filter(function ($article) use ($userDepartments) {
            foreach ($userDepartments as $department) {
                if ($this->departmentMatches($article->department, $department)) {
                    return true;
                }
            }

            return false;
        })
        ->map(function ($article) {
            $date = $article->date;
            $status = $article->status ?? 'pending';
            
            // Get first image for preview
            $image = DB::table('article_images')
                ->where('article_id', $article->id)
                ->orderBy('sort_order')
                ->orderBy('id')
                ->first();
            
            $imageUrl = null;
            if ($image && !empty($image->image_path)) {
                $imageUrl = '/' . ltrim($image->image_path, '/');
            }
            
            return [
                'id' => $article->id,
                'title' => $article->title,
                'content' => $article->content,
                'department' => $article->department,
                'status' => ucfirst($status),
                'date' => $date ? $date->format('Y-m-d') : now()->format('Y-m-d'),
                'created_by' => $article->created_by,
                'image' => $imageUrl,
            ];
        });

        // Get only the departments the current user has access to
        $departments = $user->departments()
            ->select('departments.id', 'departments.name', 'departments.slug')
            ->orderBy('name')
            ->get();

        return Inertia::render('admin/articles/Articles', [
            'articles' => $articles,
            'departments' => $departments,
        ]);
    }

    /**
     * Determine whether an article department matches a user department by normalizing aliases.
     */
    protected function departmentMatches($articleDepartment, $userDepartment)
    {
        if (empty($articleDepartment) || empty($userDepartment)) {
            return false;
        }

        $normalize = function ($value) {
            $value = strtolower(trim((string) $value));
            $value = str_replace(['&', '/', '-', '_'], ' ', $value);
            $value = preg_replace('/[^a-z0-9\s]/', '', $value);
            $value = preg_replace('/\s+/', ' ', $value);
            return trim($value);
        };

        $articleValue = $normalize($articleDepartment);
        $userValue = $normalize($userDepartment);

        $articleSlug = Str::slug((string) $articleDepartment, '-');
        $userSlug = Str::slug((string) $userDepartment, '-');

        if ($articleValue === $userValue || $articleSlug === $userSlug) {
            return true;
        }

        $aliases = [
            'sdg-news' => ['sdg news', 'sdgnews', 'sdg'],
            'office of student affairs and services' => ['osas', 'office of student affairs', 'student affairs and services'],
            'extension and development services' => ['esds', 'extension services', 'development services'],
            'research' => ['research office', 'researh'],
            'office of lifelong learning and professional development' => ['ollpd', 'olld', 'lifelong learning'],
            'technical skills and technology institute' => ['tsti', 'technical skills', 'technology institute'],
            'guidance office' => ['guidance', 'guidance office'],
            'library services' => ['library', 'lib services'],
            'college of arts and sciences' => ['cas', 'arts and sciences'],
            'college of business management' => ['cbm', 'business management'],
            'college of teacher education' => ['cte', 'teacher education'],
            'central student government' => ['csg', 'student government'],
            'oro nexus' => ['oro-nexus', 'oronexus', 'oro nexus'],
            'volunteerism & involvement' => ['volunteerism', 'volunteerism and involvement', 'involvement'],
        ];

        $aliasKeys = [$articleValue, $userValue];
        foreach ($aliases as $canonical => $synonyms) {
            $synonymSet = array_merge([$canonical], $synonyms);
            foreach ($synonymSet as $synonym) {
                if (in_array($synonym, $aliasKeys, true)) {
                    foreach ([$articleValue, $userValue] as $value) {
                        if ($value === $canonical || in_array($value, $synonyms, true)) {
                            return true;
                        }
                    }
                }
            }
        }

        return false;
    }

    /**
     * Display a listing of articles for approval (pending articles only).
     */
    public function approve()
    {
        // 🆕 Check if user has permission to approve articles
        if (!$this->hasPermission('approve_articles')) {
            if (request()->expectsJson() || request()->ajax() || request()->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized: You do not have permission to approve articles'
                ], 403);
            }
            return redirect()->route('admin.dashboard')->with('error', 'You do not have permission to approve articles.');
        }

        $articles = NewsArticle::select(
            'id',
            'title',
            'content',
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
            
            // Get first image for preview
            $image = DB::table('article_images')
                ->where('article_id', $article->id)
                ->orderBy('sort_order')
                ->orderBy('id')
                ->first();
            
            $imageUrl = null;
            if ($image && !empty($image->image_path)) {
                $imageUrl = '/' . ltrim($image->image_path, '/');
            }
            
            return [
                'id' => $article->id,
                'title' => $article->title,
                'content' => $article->content,
                'department' => $article->department,
                'status' => ucfirst($status),
                'date' => $date ? $date->format('Y-m-d') : now()->format('Y-m-d'),
                'created_by' => $article->created_by,
                'image' => $imageUrl,
            ];
        });

        return Inertia::render('admin/articles/ApproveArticles', [
            'articles' => $articles,
        ]);
    }

    /**
     * Suggest relevant SDGs for an article using the configured AI provider.
     */
    public function suggestSdgs(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string', 'max:30000'],
        ]);

        $apiKey = config('services.openai.key');
        if (!$apiKey) {
            return response()->json([
                'message' => 'SDG AI suggestions are not configured.',
            ], 503);
        }

        $sdgDescriptions = [
            1 => 'No Poverty',
            2 => 'Zero Hunger',
            3 => 'Good Health and Well-being',
            4 => 'Quality Education',
            5 => 'Gender Equality',
            6 => 'Clean Water and Sanitation',
            7 => 'Affordable and Clean Energy',
            8 => 'Decent Work and Economic Growth',
            9 => 'Industry, Innovation and Infrastructure',
            10 => 'Reduced Inequalities',
            11 => 'Sustainable Cities and Communities',
            12 => 'Responsible Consumption and Production',
            13 => 'Climate Action',
            14 => 'Life Below Water',
            15 => 'Life on Land',
            16 => 'Peace, Justice and Strong Institutions',
            17 => 'Partnerships for the Goals',
        ];

        $response = Http::timeout(30)
            ->withToken($apiKey)
            ->post('https://api.openai.com/v1/chat/completions', [
                'model' => config('services.openai.model', 'gpt-4o-mini'),
                'temperature' => 0,
                'response_format' => ['type' => 'json_object'],
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => 'Classify the article against the official UN Sustainable Development Goals. Return only JSON in the form {"sdgs":[{"number":1,"confidence":0.0,"reason":"short evidence-based reason"}]}. Include only genuinely relevant goals, use numbers 1-17, confidence between 0 and 1, and do not infer a goal from a passing mention. The available goals are: ' . json_encode($sdgDescriptions),
                    ],
                    [
                        'role' => 'user',
                        'content' => "Title: {$validated['title']}\n\nContent: {$validated['content']}",
                    ],
                ],
            ]);

        if ($response->failed()) {
            return response()->json([
                'message' => 'The SDG suggestion service is temporarily unavailable.',
            ], 502);
        }

        $payload = json_decode($response->json('choices.0.message.content', '{}'), true);
        $suggestions = collect($payload['sdgs'] ?? [])
            ->filter(fn ($suggestion) => is_array($suggestion))
            ->map(function ($suggestion) {
                return [
                    'number' => (int) ($suggestion['number'] ?? 0),
                    'confidence' => max(0, min(1, (float) ($suggestion['confidence'] ?? 0))),
                    'reason' => trim((string) ($suggestion['reason'] ?? '')),
                ];
            })
            ->filter(fn ($suggestion) => $suggestion['number'] >= 1 && $suggestion['number'] <= 17)
            ->unique('number')
            ->values();

        return response()->json(['sdgs' => $suggestions]);
    }

    /**
     * Store a newly created article in storage.
     */
    public function store(Request $request)
    {
        // 🆕 Check if user has permission to create articles
        if (!$this->hasPermission('articles')) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized: You do not have permission to create articles'
            ], 403);
        }

        $normalizedSdg = $request->input('sdg', []);
        if (!is_array($normalizedSdg)) {
            $normalizedSdg = [$normalizedSdg];
        }

        $normalizedSdg = array_values(array_filter(array_map(function ($value) {
            if ($value === null || $value === '') {
                return null;
            }

            $digits = preg_replace('/\D+/', '', (string) $value);

            return $digits !== '' ? (int) $digits : null;
        }, $normalizedSdg), fn ($value) => $value !== null));

        $request->merge(['sdg' => $normalizedSdg]);

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

                $imagePath = 'storage/' . $storedPath;
                $imageRecord = [
                    'id' => null,
                    'article_id' => $article->id,
                    'image_path' => '/' . ltrim($imagePath, '/'),
                    'alt_text' => $article->title . ' - Image ' . ($index + 1),
                    'sort_order' => $index + 1,
                ];

                DB::table('article_images')->insert([
                    'article_id' => $article->id,
                    'image_path' => $imagePath,
                    'alt_text' => $article->title . ' - Image ' . ($index + 1),
                    'sort_order' => $index + 1,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
                
                $savedImages[] = $imageRecord;
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Article created successfully.',
            'article' => [
                'id' => $article->id,
                'title' => $article->title,
                'department' => $article->department,
                'status' => ucfirst($article->status),
                'date' => $article->date ? $article->date->format('Y-m-d') : now()->format('Y-m-d'),
                'created_by' => $article->created_by,
                'image' => !empty($savedImages) ? $savedImages[0]['image_path'] : null,
            ],
            'images' => $savedImages,
        ], 201);
    }

    protected function normalizeArticleStatus(?string $status): string
    {
        if ($status === null || trim($status) === '') {
            return 'pending';
        }

        $normalizedStatus = strtolower(trim($status));

        return in_array($normalizedStatus, ['pending', 'approved', 'rejected'], true)
            ? $normalizedStatus
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
        // 🆕 Check if user has permission to edit articles
        if (!$this->hasPermission('articles')) {
            if ($request->expectsJson() || $request->ajax() || $request->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized: You do not have permission to edit articles'
                ], 403);
            }
            return redirect()->route('admin.articles')->with('error', 'You do not have permission to edit articles.');
        }

        $normalizedSdg = $request->input('sdg', []);
        if (!is_array($normalizedSdg)) {
            $normalizedSdg = [$normalizedSdg];
        }

        $normalizedSdg = array_values(array_filter(array_map(function ($value) {
            if ($value === null || $value === '') {
                return null;
            }

            $digits = preg_replace('/\D+/', '', (string) $value);

            return $digits !== '' ? (int) $digits : null;
        }, $normalizedSdg), fn ($value) => $value !== null));

        $request->merge(['sdg' => $normalizedSdg]);

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

                $imagePath = 'storage/' . $storedPath;
                $imageRecord = [
                    'article_id' => $article->id,
                    'image_path' => '/' . ltrim($imagePath, '/'),
                    'alt_text' => $article->title . ' - Image ' . ($currentImageCount + $index + 1),
                    'sort_order' => $currentImageCount + $index + 1,
                ];

                DB::table('article_images')->insert([
                    'article_id' => $article->id,
                    'image_path' => $imagePath,
                    'alt_text' => $article->title . ' - Image ' . ($currentImageCount + $index + 1),
                    'sort_order' => $currentImageCount + $index + 1,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
                
                $savedImages[] = $imageRecord;
            }
        }

        // Fetch all current images with normalized paths
        $allImages = DB::table('article_images')
            ->where('article_id', $article->id)
            ->orderBy('sort_order')
            ->get()
            ->map(function ($image) {
                return [
                    'id' => $image->id,
                    'article_id' => $image->article_id,
                    'image_path' => '/' . ltrim($image->image_path, '/'),
                    'alt_text' => $image->alt_text,
                    'sort_order' => $image->sort_order,
                ];
            });

        // Return JSON response for AJAX requests
        if ($request->expectsJson() || $request->ajax() || $request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Article updated successfully.',
                'article' => [
                    'id' => $article->id,
                    'title' => $article->title,
                    'department' => $article->department,
                    'status' => ucfirst($article->status),
                    'date' => $article->date ? $article->date->format('Y-m-d') : now()->format('Y-m-d'),
                    'created_by' => $article->created_by,
                    'image' => $allImages->isNotEmpty() ? $allImages->first()['image_path'] : null,
                ],
                'images' => $allImages,
            ]);
        }

        return redirect()->route('admin.articles')->with('success', 'Article updated successfully.');
    }

    /**
     * Remove the specified article from storage.
     */
    public function destroy(NewsArticle $article)
    {
        // 🆕 Check if user has permission to delete articles
        if (!$this->hasPermission('user_management')) {
            if (request()->expectsJson() || request()->ajax() || request()->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized: You do not have permission to delete articles'
                ], 403);
            }
            return redirect()->route('admin.articles')->with('error', 'You do not have permission to delete articles.');
        }

        $article->delete();

        // Return JSON response for AJAX requests
        if (request()->expectsJson() || request()->ajax() || request()->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Article deleted successfully.',
            ]);
        }

        return redirect()->route('admin.articles')->with('success', 'Article deleted successfully.');
    }

    /**
     * Approve an article (change status to approved).
     */
    public function approveArticle(Request $request, NewsArticle $article)
    {
        // 🆕 Check if user has permission to approve articles
        if (!$this->hasPermission('approve_articles')) {
            if ($request->expectsJson() || $request->ajax() || $request->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized: You do not have permission to approve articles'
                ], 403);
            }
            return redirect()->route('admin.approve-articles')->with('error', 'You do not have permission to approve articles.');
        }

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
        // 🆕 Check if user has permission to approve articles (reject is part of approval flow)
        if (!$this->hasPermission('approve_articles')) {
            if ($request->expectsJson() || $request->ajax() || $request->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized: You do not have permission to reject articles'
                ], 403);
            }
            return redirect()->route('admin.approve-articles')->with('error', 'You do not have permission to reject articles.');
        }

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

    /**
     * Archive an article by resetting its status to pending.
     */
    public function archiveArticle(Request $request, NewsArticle $article)
    {
        // 🆕 Check if user has permission to archive articles (requires 'articles' permission)
        if (!$this->hasPermission('articles')) {
            if ($request->expectsJson() || $request->ajax() || $request->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized: You do not have permission to archive articles'
                ], 403);
            }
            return redirect()->route('admin.articles')->with('error', 'You do not have permission to archive articles.');
        }

        $validated = $request->validate([
            'status' => ['nullable', 'string'],
        ]);

        $article->update([
            'status' => 'pending',
        ]);

        if ($request->expectsJson() || $request->ajax() || $request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Article moved back to pending status.',
                'article' => $article,
            ]);
        }

        return redirect()->route('admin.articles')->with('success', 'Article moved back to pending status.');
    }

    /**
     * Return article counts by status for admin notifications.
     */
    public function articleStatusCounts()
    {
        $counts = ['pending' => 0, 'rejected' => 0];

        foreach (NewsArticle::query()->select('status')->get() as $article) {
            $status = strtolower((string) ($article->status ?? 'pending'));

            if (in_array($status, ['pending', 'draft'], true)) {
                $counts['pending']++;
            }

            if ($status === 'rejected') {
                $counts['rejected']++;
            }
        }

        return response()->json([
            'success' => true,
            'counts' => $counts,
        ]);
    }

    /**
     * 🆕 Helper method to check if user has a specific permission
     * 
     * @param string $permission
     * @return bool
     */
    private function hasPermission($permission)
    {
        $user = Auth::user();
        
        if (!$user) {
            return false;
        }

        return DB::table('access_controls')
            ->where('user_id', $user->id)
            ->where('permission', $permission)
            ->exists();
    }
}