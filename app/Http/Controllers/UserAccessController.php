<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Department;
use App\Models\AccessControl;
use App\Models\NewsArticle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UserAccessController extends Controller
{
    /**
     * ============================================
     * DEPARTMENT ACCESS METHODS
     * ============================================
     */

    /**
     * Get the current user's accessible departments (for dropdown in AddArticles)
     * This is called by /user/departments route
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUserAccessibleDepartments()
    {
        $user = Auth::user();
        
        if (!$user) {
            return response()->json([
                'departments' => [],
                'message' => 'User not authenticated'
            ], 401);
        }

        // Get user's departments from user_departments table using the slug column.
        $departments = $user->departments()
            ->select('departments.id', 'departments.name', 'departments.slug')
            ->orderBy('departments.name')
            ->get();

        // If user has no assigned departments, return empty array
        if ($departments->isEmpty()) {
            return response()->json([
                'departments' => [],
                'department_names' => [],
                'department_slugs' => [],
                'message' => 'No departments assigned to this user'
            ]);
        }

        return response()->json([
            'departments' => $departments,
            'department_names' => $departments->pluck('name')->toArray(),
            'department_slugs' => $departments->pluck('slug')->toArray(),
        ]);
    }

    /**
     * Get user's departments (alias for getUserAccessibleDepartments)
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUserDepartments()
    {
        return $this->getUserAccessibleDepartments();
    }

    /**
     * Get all departments with access info for a specific user
     * Shows which departments a user has access to (with has_access flag)
     * 
     * @param int|null $userId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllDepartmentsWithAccess($userId = null)
    {
        $userId = $userId ?? Auth::id();
        
        if (!$userId) {
            return response()->json(['error' => 'User ID required'], 400);
        }

        $user = User::findOrFail($userId);
        $userDepartments = $user->departments->pluck('id')->toArray();

        $allDepartments = Department::select('id', 'name', 'slug', 'description')
            ->orderBy('name')
            ->get()
            ->map(function ($department) use ($userDepartments) {
                return [
                    'id' => $department->id,
                    'name' => $department->name,
                    'slug' => $department->slug,
                    'description' => $department->description,
                    'has_access' => in_array($department->id, $userDepartments),
                ];
            });

        return response()->json([
            'departments' => $allDepartments,
        ]);
    }

    /**
     * Filter articles by user's departments
     * Used to restrict article visibility based on user's department access
     * 
     * @param mixed $articles
     * @return mixed
     */
    public function filterArticlesByDepartment($articles)
    {
        $user = Auth::user();
        
        if (!$user) {
            return $articles;
        }

        // If user has no departments assigned, return empty collection.
        // Use the Department.slug column for access matching.
        $userDepartments = $user->departments()->pluck('departments.slug')->toArray();
        
        if (empty($userDepartments)) {
            return collect([]);
        }

        return $articles->filter(function ($article) use ($userDepartments) {
            foreach ($userDepartments as $department) {
                if ($this->departmentMatches($article->department, $department)) {
                    return true;
                }
            }

            return false;
        });
    }

    /**
     * Get approved articles for the current user based on assigned department(s)
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUserArticles()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'articles' => [],
                'message' => 'User not authenticated'
            ], 401);
        }

        $userDepartments = $user->departments()->pluck('departments.slug')->toArray();

        if (empty($userDepartments)) {
            return response()->json([
                'articles' => [],
                'message' => 'No departments assigned to this user'
            ]);
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
            })
            ->values();

        return response()->json([
            'articles' => $articles,
            'departments' => $userDepartments,
        ]);
    }

    /**
     * Match a department value from an article to a user department even when names use different formatting.
     *
     * @param string|null $articleDepartment
     * @param string|null $userDepartment
     * @return bool
     */
    protected function departmentMatches($articleDepartment, $userDepartment)
    {
        if (empty($articleDepartment) || empty($userDepartment)) {
            return false;
        }

        $articleValue = strtolower((string) $articleDepartment);
        $userValue = strtolower((string) $userDepartment);

        $normalize = function ($value) {
            return preg_replace('/[^a-z0-9]+/', '', strtolower((string) $value));
        };

        $articleNormalized = $normalize($articleValue);
        $userNormalized = $normalize($userValue);
        $articleSlug = Str::slug((string) $articleDepartment, '-');
        $userSlug = Str::slug((string) $userDepartment, '-');

        if ($articleNormalized === $userNormalized || $articleSlug === $userSlug) {
            return true;
        }

        $articleWords = preg_split('/[^a-z0-9]+/', strtolower((string) $articleDepartment), -1, PREG_SPLIT_NO_EMPTY);
        $userWords = preg_split('/[^a-z0-9]+/', strtolower((string) $userDepartment), -1, PREG_SPLIT_NO_EMPTY);

        foreach ($userWords as $word) {
            if ($word === '') {
                continue;
            }

            if (strlen($word) <= 2) {
                continue;
            }

            if (str_contains($articleValue, $word) || str_contains($userValue, $word)) {
                foreach ($articleWords as $articleWord) {
                    if ($articleWord === $word) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    /**
     * ============================================
     * PERMISSION & MENU METHODS
     * ============================================
     */

    /**
     * Get the current user's permissions and menus
     * This is called by /user/permissions route (used by Sidebar)
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUserPermissions()
    {
        $user = Auth::user();
        
        if (!$user) {
            return response()->json([
                'authenticated' => false,
                'message' => 'User not authenticated'
            ], 401);
        }

        // Get user's departments
        $departments = $user->departments()->pluck('departments.name')->toArray();
        
        // Get user's access controls (permissions) from access_controls table
        $permissions = DB::table('access_controls')
            ->where('user_id', $user->id)
            ->pluck('permission')
            ->toArray();

        // Define menu items based on user's permissions
        $menus = $this->getMenuItems($permissions);

        return response()->json([
            'authenticated' => true,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'status' => $user->status,
                'departments' => $departments,
                'permissions' => $permissions,
            ],
            'menus' => $menus,
        ]);
    }

    /**
     * Define menu items with their required permissions
     * 
     * @param array $userPermissions
     * @return array
     */
    private function getMenuItems($userPermissions)
    {
        // Define all available menus and their required permissions
        $allMenus = [
            [
                'id' => 'dashboard',
                'name' => 'Dashboard',
                'required_permission' => null, // Always accessible
                'route' => 'admin.dashboard'
            ],
            [
                'id' => 'articles',
                'name' => 'Articles',
                'required_permission' => 'articles',
                'route' => 'admin.articles'
            ],
            [
                'id' => 'approve_articles',
                'name' => 'Approve Articles',
                'required_permission' => 'approve_articles',
                'route' => 'admin.approve-articles'
            ],
            [
                'id' => 'promotions',
                'name' => 'Promotions',
                'required_permission' => 'promotions',
                'route' => 'admin.promotions'
            ],
            [
                'id' => 'events',
                'name' => 'Events',
                'required_permission' => 'events',
                'route' => 'admin.events'
            ],
            [
                'id' => 'research',
                'name' => 'Research',
                'required_permission' => 'research',
                'route' => 'admin.research'
            ],
            [
                'id' => 'content',
                'name' => 'Content',
                'required_permission' => 'content',
                'route' => 'admin.content'
            ],
            [
                'id' => 'user_management',
                'name' => 'User Management',
                'required_permission' => 'user_management',
                'route' => 'admin.usersmanagement'
            ],
            [
                'id' => 'settings',
                'name' => 'Settings',
                'required_permission' => 'settings',
                'route' => 'admin.settings'
            ],
        ];

        // Filter menus based on user permissions
        return array_values(array_filter($allMenus, function ($menu) use ($userPermissions) {
            // If no permission required, show the menu
            if ($menu['required_permission'] === null) {
                return true;
            }
            // Check if user has the required permission
            return in_array($menu['required_permission'], $userPermissions);
        }));
    }

    /**
     * Check if user can access a specific menu
     * 
     * @param string $menuId
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkMenuAccess($menuId)
    {
        $user = Auth::user();
        
        if (!$user) {
            return response()->json(['access' => false], 401);
        }

        // Define menu permission mapping
        $menuPermissions = [
            'dashboard' => null,
            'articles' => 'articles',
            'approve_articles' => 'approve_articles',
            'promotions' => 'promotions',
            'events' => 'events',
            'research' => 'research',
            'content' => 'content',
            'user_management' => 'user_management',
            'settings' => 'settings',
        ];

        $requiredPermission = $menuPermissions[$menuId] ?? null;

        // If no permission required, allow access
        if ($requiredPermission === null) {
            return response()->json(['access' => true]);
        }

        // Check if user has the required permission
        $hasAccess = DB::table('access_controls')
            ->where('user_id', $user->id)
            ->where('permission', $requiredPermission)
            ->exists();

        return response()->json(['access' => $hasAccess]);
    }

    /**
     * ============================================
     * PERMISSION CHECK METHODS
     * ============================================
     */

    /**
     * Check if user has a specific permission
     * 
     * @param string $permission
     * @return \Illuminate\Http\JsonResponse
     */
    public function hasPermission($permission)
    {
        $user = Auth::user();
        
        if (!$user) {
            return response()->json(['has_permission' => false], 401);
        }

        $hasPermission = DB::table('access_controls')
            ->where('user_id', $user->id)
            ->where('permission', $permission)
            ->exists();

        return response()->json([
            'has_permission' => $hasPermission,
            'permission' => $permission
        ]);
    }

    /**
     * Check if user has any of the given permissions
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function hasAnyPermission(Request $request)
    {
        $user = Auth::user();
        
        if (!$user) {
            return response()->json(['has_permission' => false], 401);
        }

        $permissions = $request->input('permissions', []);
        
        if (empty($permissions)) {
            return response()->json([
                'has_permission' => false, 
                'message' => 'No permissions provided'
            ]);
        }

        $hasPermission = DB::table('access_controls')
            ->where('user_id', $user->id)
            ->whereIn('permission', $permissions)
            ->exists();

        return response()->json([
            'has_permission' => $hasPermission,
            'permissions' => $permissions
        ]);
    }

    /**
     * Get the current user's profile data
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUserProfile()
    {
        $user = Auth::user();
        
        if (!$user) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'firstname' => $user->firstname,
                'middlename' => $user->middlename,
                'lastname' => $user->lastname,
                'role' => $user->role ?? 'User',
                'status' => $user->status,
                'email_verified_at' => $user->email_verified_at,
            ]
        ]);
    }
}