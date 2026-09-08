<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    // Login routes
    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');
    
    Route::post('login', [AuthenticatedSessionController::class, 'store'])
        ->name('login.store');

    Route::post('login/verify-otp', [AuthenticatedSessionController::class, 'verifyOtp'])
        ->middleware('throttle:10,1')
        ->name('login.verify-otp');

    Route::post('login/resend-otp', [AuthenticatedSessionController::class, 'resendOtp'])
        ->middleware('throttle:3,10')
        ->name('login.resend-otp');
});

Route::middleware('auth')->group(function () {
    // Logout route - should be POST not GET
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});