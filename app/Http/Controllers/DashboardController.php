<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\NewsArticle;
use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Get dashboard statistics for the authenticated user
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function getStats()
    {
        $user = Auth::user();
        
        if (!$user) {
            return response()->json([
                'error' => 'User not authenticated'
            ], 401);
        }

        // Get user's department slugs, because articles are stored with the department slug.
        $userDepartments = $user->departments()->pluck('departments.slug')->toArray();
        
        // If user has no departments, return empty stats
        if (empty($userDepartments)) {
            return response()->json([
                'stats' => [
                    'totalArticles' => 0,
                    'approved' => 0,
                    'pending' => 0,
                    'rejected' => 0
                ],
                'departmentStats' => [],
                'userRank' => null,
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'firstname' => $user->firstname ?? '',
                    'lastname' => $user->lastname ?? '',
                    'department' => $user->department ?? null,
                    'departments' => $userDepartments
                ],
                'message' => 'No departments assigned to this user'
            ]);
        }

        // Get articles from user's departments
        $articles = NewsArticle::whereIn('department', $userDepartments)->get();
        
        // Calculate stats using the lowercase status values saved in the article records.
        $stats = [
            'totalArticles' => $articles->count(),
            'approved' => $articles->where('status', 'approved')->count(),
            'pending' => $articles->where('status', 'pending')->count(),
            'rejected' => $articles->where('status', 'rejected')->count()
        ];

        // Calculate department statistics (rankings)
        $departmentStats = $this->getDepartmentRankings($userDepartments);
        
        // Get user's department rank
        $userRank = $this->getUserRank($user, $departmentStats);

        return response()->json([
            'stats' => $stats,
            'departmentStats' => $departmentStats,
            'userRank' => $userRank,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'firstname' => $user->firstname ?? '',
                'lastname' => $user->lastname ?? '',
                'department' => $user->department ?? null,
                'departments' => $userDepartments
            ]
        ]);
    }

    /**
     * Get department rankings based on article counts
     * 
     * @param array $userDepartments
     * @return array
     */
    private function getDepartmentRankings($userDepartments)
    {
        // Match the real schema: department slug is stored in articles.department and the status is stored in lowercase.
        $departmentStats = Department::select(
            'departments.id',
            'departments.name',
            'departments.slug',
            DB::raw('COUNT(articles.id) as total'),
            DB::raw('SUM(CASE WHEN LOWER(articles.status) = "approved" THEN 1 ELSE 0 END) as approved'),
            DB::raw('SUM(CASE WHEN LOWER(articles.status) = "pending" THEN 1 ELSE 0 END) as pending'),
            DB::raw('SUM(CASE WHEN LOWER(articles.status) = "rejected" THEN 1 ELSE 0 END) as rejected')
        )
        ->leftJoin('news_articles as articles', 'departments.slug', '=', 'articles.department')
        ->groupBy('departments.id', 'departments.name', 'departments.slug')
        ->orderBy('total', 'desc')
        ->get()
        ->toArray();

        // Add rank to each department
        $rankedDepartments = [];
        foreach ($departmentStats as $index => $dept) {
            $rankedDepartments[] = [
                'id' => $dept['id'],
                'name' => $dept['name'],
                'slug' => $dept['slug'],
                'total' => (int) $dept['total'],
                'approved' => (int) $dept['approved'],
                'pending' => (int) $dept['pending'],
                'rejected' => (int) $dept['rejected'],
                'rank' => $index + 1,
                'rankIcon' => $index === 0 ? '🥇' : ($index === 1 ? '🥈' : ($index === 2 ? '🥉' : '#' . ($index + 1)))
            ];
        }

        return $rankedDepartments;
    }

    /**
     * Get the user's department rank
     * 
     * @param User $user
     * @param array $departmentStats
     * @return array|null
     */
    private function getUserRank($user, $departmentStats)
    {
        $userDepartmentSlugs = $user->departments()->pluck('departments.slug')->toArray();
        $userDepartmentNames = $user->departments()->pluck('departments.name')->toArray();

        // Check if user has a department
        if (empty($userDepartmentSlugs) && empty($userDepartmentNames)) {
            return null;
        }

        // Find the user's department in the rankings
        foreach ($departmentStats as $dept) {
            if (in_array($dept['slug'], $userDepartmentSlugs, true) || in_array($dept['name'], $userDepartmentNames, true) || $dept['name'] === $user->department) {
                return [
                    'department' => $dept['name'],
                    'rank' => $dept['rank'],
                    'total' => $dept['total'],
                    'approved' => $dept['approved'],
                    'pending' => $dept['pending'],
                    'rejected' => $dept['rejected']
                ];
            }
        }

        return null;
    }

    /**
     * Get dashboard data for the admin view (Inertia)
     * 
     * @return \Inertia\Response
     */
    public function dashboard()
    {
        $user = Auth::user();
        
        if (!$user) {
            return redirect()->route('login');
        }

        // Get user's department slugs so they match the stored article department values.
        $userDepartments = $user->departments()->pluck('departments.slug')->toArray();
        
        // If user has no departments, return empty data
        if (empty($userDepartments)) {
            return Inertia::render('admin/Dashboard', [
                'stats' => [
                    'totalArticles' => 0,
                    'approved' => 0,
                    'pending' => 0,
                    'rejected' => 0
                ],
                'departmentStats' => [],
                'userRank' => null,
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'firstname' => $user->firstname ?? '',
                    'lastname' => $user->lastname ?? '',
                    'department' => $user->department ?? null,
                    'departments' => $userDepartments
                ]
            ]);
        }

        // Get articles from user's departments using the stored slug field.
        $articles = NewsArticle::whereIn('department', $userDepartments)->get();
        
        // Calculate stats using the lowercase status values that ArticlesController saves.
        $stats = [
            'totalArticles' => $articles->count(),
            'approved' => $articles->where('status', 'approved')->count(),
            'pending' => $articles->where('status', 'pending')->count(),
            'rejected' => $articles->where('status', 'rejected')->count()
        ];

        // Get department rankings
        $departmentStats = $this->getDepartmentRankings($userDepartments);
        
        // Get user's rank
        $userRank = $this->getUserRank($user, $departmentStats);

        return Inertia::render('admin/Dashboard', [
            'stats' => $stats,
            'departmentStats' => $departmentStats,
            'userRank' => $userRank,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'firstname' => $user->firstname ?? '',
                'lastname' => $user->lastname ?? '',
                'department' => $user->department ?? null,
                'departments' => $userDepartments
            ]
        ]);
    }

    /**
     * Get all departments with their article counts (for admin)
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllDepartmentRankings()
    {
        $user = Auth::user();
        
        // Check if user has admin permission
        $hasAdminPermission = DB::table('access_controls')
            ->where('user_id', $user->id)
            ->whereIn('permission', ['user_management', 'admin'])
            ->exists();

        if (!$hasAdminPermission && $user->role !== 'admin') {
            return response()->json([
                'error' => 'Unauthorized. Admin access required.'
            ], 403);
        }

        // Get all departments with article counts using department slug matching.
        $departmentStats = Department::select(
            'departments.id',
            'departments.name',
            'departments.slug',
            DB::raw('COUNT(articles.id) as total'),
            DB::raw('SUM(CASE WHEN LOWER(articles.status) = "approved" THEN 1 ELSE 0 END) as approved'),
            DB::raw('SUM(CASE WHEN LOWER(articles.status) = "pending" THEN 1 ELSE 0 END) as pending'),
            DB::raw('SUM(CASE WHEN LOWER(articles.status) = "rejected" THEN 1 ELSE 0 END) as rejected')
        )
        ->leftJoin('news_articles as articles', 'departments.slug', '=', 'articles.department')
        ->groupBy('departments.id', 'departments.name', 'departments.slug')
        ->orderBy('total', 'desc')
        ->get()
        ->map(function ($dept, $index) {
            return [
                'id' => $dept->id,
                'name' => $dept->name,
                'slug' => $dept->slug,
                'total' => (int) $dept->total,
                'approved' => (int) $dept->approved,
                'pending' => (int) $dept->pending,
                'rejected' => (int) $dept->rejected,
                'rank' => $index + 1,
                'rankIcon' => $index === 0 ? '🥇' : ($index === 1 ? '🥈' : ($index === 2 ? '🥉' : '#' . ($index + 1)))
            ];
        });

        return response()->json([
            'departmentStats' => $departmentStats,
            'totalDepartments' => $departmentStats->count()
        ]);
    }

    /**
     * Get article status counts for a specific department
     * 
     * @param string $departmentName
     * @return \Illuminate\Http\JsonResponse
     */
    public function getDepartmentStats($departmentName)
    {
        $user = Auth::user();
        
        // Check if user has access to this department using the stored department slug.
        $userDepartments = $user->departments()->pluck('departments.slug')->toArray();
        
        // Check if user has admin permission
        $hasAdminPermission = DB::table('access_controls')
            ->where('user_id', $user->id)
            ->whereIn('permission', ['user_management', 'admin'])
            ->exists();

        if (!in_array($departmentName, $userDepartments) && !$hasAdminPermission && $user->role !== 'admin') {
            return response()->json([
                'error' => 'Unauthorized access to this department'
            ], 403);
        }

        $articles = NewsArticle::where('department', $departmentName)->get();
        
        return response()->json([
            'department' => $departmentName,
            'stats' => [
                'total' => $articles->count(),
                'approved' => $articles->where('status', 'approved')->count(),
                'pending' => $articles->where('status', 'pending')->count(),
                'rejected' => $articles->where('status', 'rejected')->count()
            ],
            'articles' => $articles
        ]);
    }
}