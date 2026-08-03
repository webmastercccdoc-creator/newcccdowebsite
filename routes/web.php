<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('content/Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('admin/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

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

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
