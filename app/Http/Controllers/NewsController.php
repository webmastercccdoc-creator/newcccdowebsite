<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class NewsController extends Controller
{
    public function index()
    {
        $newsArticles = DB::table('news_articles as na')
            ->select([
                'na.id',
                'na.title',
                'na.content',
                'na.date',
                DB::raw('(SELECT ai.image_path FROM article_images ai WHERE ai.article_id = na.id ORDER BY ai.sort_order ASC, ai.id ASC LIMIT 1) as image_path'),
                DB::raw('(SELECT ai.alt_text FROM article_images ai WHERE ai.article_id = na.id ORDER BY ai.sort_order ASC, ai.id ASC LIMIT 1) as article_alt_text'),
                DB::raw('(SELECT GROUP_CONCAT(DISTINCT asa.sdg_number ORDER BY asa.sdg_number SEPARATOR ",") FROM article_sdg_associations asa WHERE asa.article_id = na.id) as sdg_numbers'),
            ])
            ->where('na.status', 'approved')
            ->orderByDesc('na.date')
            ->orderByDesc('na.id')
            ->get();

        return Inertia::render('content/News/LatestNews', [
            'newsArticles' => $newsArticles,
        ]);
    }

    public function apiIndex()
    {
        $newsArticles = DB::table('news_articles as na')
            ->select([
                'na.id',
                'na.title',
                'na.content',
                'na.date',
                DB::raw('(SELECT ai.image_path FROM article_images ai WHERE ai.article_id = na.id ORDER BY ai.sort_order ASC, ai.id ASC LIMIT 1) as image_path'),
                DB::raw('(SELECT ai.alt_text FROM article_images ai WHERE ai.article_id = na.id ORDER BY ai.sort_order ASC, ai.id ASC LIMIT 1) as article_alt_text'),
                DB::raw('(SELECT GROUP_CONCAT(DISTINCT asa.sdg_number ORDER BY asa.sdg_number SEPARATOR ",") FROM article_sdg_associations asa WHERE asa.article_id = na.id) as sdg_numbers'),
            ])
            ->where('na.status', 'approved')
            ->orderByDesc('na.date')
            ->orderByDesc('na.id')
            ->get();

        return response()->json($newsArticles);
    }

    public function show($id)
    {
        $article = DB::table('news_articles as na')
            ->select([
                'na.*',
                DB::raw('(SELECT ai.image_path FROM article_images ai WHERE ai.article_id = na.id ORDER BY ai.sort_order ASC, ai.id ASC LIMIT 1) as image_path'),
                DB::raw('(SELECT ai.alt_text FROM article_images ai WHERE ai.article_id = na.id ORDER BY ai.sort_order ASC, ai.id ASC LIMIT 1) as article_alt_text'),
            ])
            ->where('na.id', $id)
            ->where('na.status', 'approved')
            ->first();

        if (!$article) {
            abort(404);
        }

        $images = DB::table('article_images')
            ->where('article_id', $id)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();

        return Inertia::render('content/News/ViewArticle', [
            'article' => $article,
            'articleImages' => $images,
        ]);
    }

    public function apiShow($id)
    {
        $article = DB::table('news_articles as na')
            ->select([
                'na.*',
                DB::raw('(SELECT ai.image_path FROM article_images ai WHERE ai.article_id = na.id ORDER BY ai.sort_order ASC, ai.id ASC LIMIT 1) as image_path'),
                DB::raw('(SELECT ai.alt_text FROM article_images ai WHERE ai.article_id = na.id ORDER BY ai.sort_order ASC, ai.id ASC LIMIT 1) as article_alt_text'),
            ])
            ->where('na.id', $id)
            ->where('na.status', 'approved')
            ->first();

        if (!$article) {
            return response()->json([
                'article' => null,
                'images' => [],
            ], 404);
        }

        $images = DB::table('article_images')
            ->where('article_id', $id)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();

        return response()->json([
            'article' => $article,
            'images' => $images,
        ]);
    }
}
