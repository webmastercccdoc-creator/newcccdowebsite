<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\NewsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index']);

Route::get('/login-page', function () {
    return Inertia::render('Auth/Login');
})->name('login.page');

Route::get('/dashboard', [AdminController::class, 'dashboard'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

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

Route::get('/offices/vp-research-extension', function () {
    return Inertia::render('content/Offices/VPResearchExtension');
})->name('offices.vp-research-extension');

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

Route::get('/programs/technical-skill-technology', function () {
    return Inertia::render('content/Academics/TechnicalSkillsTechnologyInstitute');
})->name('academics.technical-skill-technology');

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

Route::get('/news/latest', function () {
    return Inertia::render('content/News/LatestNews');
})->name('news.latest');

Route::get('/contact-us', function () {
    return Inertia::render('content/Contact');
})->name('contact-us');

Route::get('/news/{id}', [\App\Http\Controllers\NewsController::class, 'show'])->name('news.show');

Route::get('/api/news', [NewsController::class, 'apiIndex']);
Route::get('/api/news/{id}', [NewsController::class, 'apiShow']);



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
