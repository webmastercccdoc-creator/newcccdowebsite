<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $newsArticles = DB::table('news_articles as na')
            ->select([
                'na.id',
                'na.title',
                'na.content',
                'na.date',
                'na.department',
                DB::raw('(SELECT ai.image_path FROM article_images ai WHERE ai.article_id = na.id ORDER BY ai.sort_order ASC, ai.id ASC LIMIT 1) as image_path'),
                DB::raw('(SELECT ai.alt_text FROM article_images ai WHERE ai.article_id = na.id ORDER BY ai.sort_order ASC, ai.id ASC LIMIT 1) as article_alt_text'),
                DB::raw('(SELECT GROUP_CONCAT(DISTINCT asa.sdg_number ORDER BY asa.sdg_number SEPARATOR ",") FROM article_sdg_associations asa WHERE asa.article_id = na.id) as sdg_numbers'),
            ])
            ->where('na.status', 'approved')
            ->orderByDesc('na.date')
            ->orderByDesc('na.id')
            ->limit(9)
            ->get();

        // Fetch active promotions for the banner
        $promotions = DB::table('promotions')
            ->where('status', 'active')
            ->where(function($query) {
                $query->whereNull('expire')
                      ->orWhere('expire', '>=', now());
            })
            ->orderByDesc('date')
            ->limit(5)
            ->get()
            ->map(function ($promotion) {
                // Normalize image path for frontend
                $bannerPath = $promotion->banner_image_path ?: $promotion->image_path;
                $carouselPath = $promotion->carousel_image_path ?: $bannerPath;
                $promotion->banner_image_url = $bannerPath && !str_starts_with($bannerPath, 'http')
                    ? asset('storage/' . $bannerPath)
                    : $bannerPath;
                $promotion->carousel_image_url = $carouselPath && !str_starts_with($carouselPath, 'http')
                    ? asset('storage/' . $carouselPath)
                    : $carouselPath;
                $promotion->image_url = $promotion->carousel_image_url;
                
                // Ensure alt text exists
                $promotion->image_alt_text = $promotion->image_alt_text ?? $promotion->title ?? 'Promotion banner';
                
                return $promotion;
            });

        return Inertia::render('content/Home/Home', [
            'canLogin' => \Route::has('login'),
            'canRegister' => \Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'newsArticles' => $newsArticles,
            'promotions' => $promotions, // Add promotions to the view data
        ]);
    }
}