<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ArticlesController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PromotionsController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\UserAccessController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ============================================
// PUBLIC ROUTES (No Authentication Required)
// ============================================

// Homepage
Route::get('/', [HomeController::class, 'index']);

// Login page (public)
Route::get('/login-page', function () {
    return Inertia::render('Auth/Login');
})->name('login.page');

// ============================================
// ABOUT PAGES
// ============================================
Route::get('/about/cagayan-de-oro-city', function () {
    return Inertia::render('content/About/CagayanDeOroCity');
})->name('about.cagayan-de-oro-city');

Route::get('/about/mayors-message', function () {
    return Inertia::render('content/About/MayorMessage');
})->name('about.mayors-message');

Route::get('/about/mission-vision', function () {
    return Inertia::render('content/About/MissionVision');
})->name('about.mission-vision');

Route::get('/about/goals-core-values', function () {
    return Inertia::render('content/About/GoalsCore');
})->name('about.goals-core-values');

Route::get('/about/graduate-attributes', function () {
    return Inertia::render('content/About/GraduateAttributes');
})->name('about.graduate-attributes');

Route::get('/about/governing-board', function () {
    return Inertia::render('content/About/GoverningBoard');
})->name('about.governing-board');

Route::get('/about/organizational-chart', function () {
    return Inertia::render('content/About/OrgChart');
})->name('about.organizational-chart');

// ============================================
// OFFICES PAGES
// ============================================
Route::get('/offices/president', function () {
    return Inertia::render('content/Offices/PresidentUnit');
})->name('offices.president');

Route::get('/offices/vp-academic-affairs', function () {
    return Inertia::render('content/Offices/VPAcademics');
})->name('offices.vp-academic-affairs');

Route::get('/offices/vp-administration-finance', function () {
    return Inertia::render('content/Offices/VPAdminFinance');
})->name('offices.vp-administration-finance');

Route::get('/offices/vp-research-extension', function () {
    return Inertia::render('content/Offices/VPResearchExtension');
})->name('offices.vp-research-extension');

// ============================================
// ACADEMICS / PROGRAMS PAGES
// ============================================
Route::get('/programs/college-of-education', function () {
    return Inertia::render('content/Academics/CollegeEducation');
})->name('academics.college-of-education');

Route::get('/programs/college-of-business-and-management', function () {
    return Inertia::render('content/Academics/CollegeBusinessManagement');
})->name('academics.college-of-business-and-management');

Route::get('/programs/college-of-arts-and-sciences', function () {
    return Inertia::render('content/Academics/CollegeArtsSciences');
})->name('academics.college-of-arts-and-sciences');

Route::get('/programs/technical-skill-technology', function () {
    return Inertia::render('content/Academics/TechnicalSkillsTechnologyInstitute');
})->name('academics.technical-skill-technology');

// ============================================
// INTERNATIONALIZATION PAGES
// ============================================
Route::get('/internationalization/sdg', function () {
    return Inertia::render('content/internationalization/SDG');
})->name('internationalization.sdg');

Route::get('/internationalization/the', function () {
    return Inertia::render('content/internationalization/THE');
})->name('internationalization.the');

Route::get('/internationalization/ui-greenmetric', function () {
    return Inertia::render('content/internationalization/UIGreenMetric');
})->name('internationalization.ui-greenmetric');

Route::get('/internationalization/wuri', function () {
    return Inertia::render('content/internationalization/WURI');
})->name('internationalization.wuri');

// ============================================
// NEWS PAGES
// ============================================
Route::get('/news/latest', function () {
    return Inertia::render('content/News/LatestNews');
})->name('news.latest');

Route::get('/news/events', function () {
    return Inertia::render('content/News/UpcomingEvents');
})->name('news.events');

Route::get('/news/news-letters', function () {
    return Inertia::render('content/News/NewsLetters');
})->name('news.news-letters');

// ============================================
// PROMOTIONS PAGE (Public) - FIXED
// ============================================
Route::get('/promotions', function () {
    return Inertia::render('admin/promotions/promotions');
})->name('promotions');

// ============================================
// CONTACT PAGE
// ============================================
Route::get('/contact-us', function () {
    return Inertia::render('content/Contact');
})->name('contact-us');

// ============================================
// NEWS API ROUTES (Public)
// ============================================
Route::get('/news/{id}', [NewsController::class, 'show'])->name('news.show');
Route::get('/api/news', [NewsController::class, 'apiIndex']);
Route::get('/api/news/{id}', [NewsController::class, 'apiShow']);

// ============================================
// PROMOTIONS API ROUTES (Public)
// ============================================
Route::get('/api/promotions', [PromotionsController::class, 'apiIndex']);
Route::get('/api/promotions/{id}', [PromotionsController::class, 'apiShow']);

// ============================================
// ADMIN ROUTES (Requires Authentication)
// ============================================
Route::middleware(['auth'])->group(function () {
    
    // ============================================
    // DASHBOARD ROUTES
    // ============================================
    // Dashboard View (Inertia)
    Route::get('/dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');
    Route::get('/admin/dashboard', [DashboardController::class, 'dashboard'])->name('admin.dashboard');
    
    // Dashboard API Endpoints
    Route::get('/api/dashboard/stats', [DashboardController::class, 'getStats']);
    Route::get('/api/dashboard/departments', [DashboardController::class, 'getAllDepartmentRankings']);
    Route::get('/api/dashboard/department/{departmentName}', [DashboardController::class, 'getDepartmentStats']);
    
    // Admin Dashboard (legacy)
    Route::get('/admin', function () {
        return Inertia::render('admin/Dashboard');
    })->name('admin');

    // ============================================
    // ARTICLES MANAGEMENT ROUTES
    // ============================================
    Route::get('/admin/articles', [ArticlesController::class, 'index'])->name('admin.articles');                              // List all articles
    Route::get('/admin/approve-articles', [ArticlesController::class, 'approve'])->name('admin.approve-articles');          // Approve articles page
    Route::post('/admin/articles', [ArticlesController::class, 'store'])->name('admin.articles.store');                     // Create new article
    Route::get('/admin/articles/status-counts', [ArticlesController::class, 'articleStatusCounts'])->name('admin.articles.status-counts'); // Get article counts
    Route::get('/admin/articles/{article}', [ArticlesController::class, 'show'])->name('admin.articles.show');               // View single article
    Route::put('/admin/articles/{article}', [ArticlesController::class, 'update'])->name('admin.articles.update');           // Update article
    Route::delete('/admin/articles/{article}', [ArticlesController::class, 'destroy'])->name('admin.articles.destroy');       // Delete article
    Route::put('/admin/articles/{article}/approve', [ArticlesController::class, 'approveArticle'])->name('admin.articles.approve'); // Approve article
    Route::put('/admin/articles/{article}/reject', [ArticlesController::class, 'rejectArticle'])->name('admin.articles.reject');     // Reject article
    Route::put('/admin/articles/{article}/archive', [ArticlesController::class, 'archiveArticle'])->name('admin.articles.archive');   // Archive article

    // ============================================
    // PROMOTIONS MANAGEMENT ROUTES (Admin)
    // ============================================
    Route::get('/admin/promotions', [PromotionsController::class, 'index'])->name('admin.promotions');                       // List all promotions
    Route::post('/admin/promotions', [PromotionsController::class, 'store'])->name('admin.promotions.store');                // Create new promotion
    Route::get('/admin/promotions/{id}', [PromotionsController::class, 'show'])->name('admin.promotions.show');              // View single promotion
    Route::put('/admin/promotions/{id}', [PromotionsController::class, 'update'])->name('admin.promotions.update');          // Update promotion
    Route::delete('/admin/promotions/{id}', [PromotionsController::class, 'destroy'])->name('admin.promotions.destroy');      // Delete promotion

    // ============================================
    // USER MANAGEMENT ROUTES
    // ============================================
    Route::get('/admin/usersmanagement', [AdminController::class, 'users'])->name('admin.usersmanagement');                  // User list page
    
    // User CRUD Operations
    Route::post('/admin/users', [AdminController::class, 'store'])->name('admin.users.store');                               // Create user
    Route::put('/admin/users/{id}', [AdminController::class, 'update'])->name('admin.users.update');                         // Update user
    Route::delete('/admin/users/{id}', [AdminController::class, 'destroy'])->name('admin.users.destroy');                     // Delete user
    Route::get('/admin/users/{id}', [AdminController::class, 'show'])->name('admin.users.show');                             // View single user

    // ============================================
    // DEPARTMENT ROUTES
    // ============================================
    // For Admin - Shows ALL departments (full list)
    Route::get('/admin/departments', [AdminController::class, 'getDepartments'])->name('admin.departments');
    
    // User Roles (if needed)
    Route::get('/admin/user-roles', [AdminController::class, 'getUserRoles'])->name('admin.user-roles');

    // ============================================
    // USER ACCESS CONTROL ROUTES
    // Gets the current authenticated user's data
    // ============================================
    Route::get('/user/departments', [UserAccessController::class, 'getUserAccessibleDepartments']);   // Get user's assigned departments
    Route::get('/user/articles', [UserAccessController::class, 'getUserArticles']);                   // Get approved articles allowed for current user
    Route::get('/user/permissions', [UserAccessController::class, 'getUserPermissions']);             // Get user's permissions & menus
    Route::get('/user/profile', [UserAccessController::class, 'getUserProfile']);                     // Get current user's profile data
    Route::get('/user/check-menu/{menuId}', [UserAccessController::class, 'checkMenuAccess']);        // Check if user can access a menu
    Route::get('/user/has-permission/{permission}', [UserAccessController::class, 'hasPermission']);  // Check if user has a permission
    Route::post('/user/has-any-permission', [UserAccessController::class, 'hasAnyPermission']);       // Check if user has any of the permissions
    Route::get('/user/all-departments/{userId?}', [UserAccessController::class, 'getAllDepartmentsWithAccess']); // Get all departments with access info

});

// ============================================
// AUTHENTICATION ROUTES
// ============================================
require __DIR__.'/auth.php';