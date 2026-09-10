<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JsonResponse
    {
        $user = $request->authenticate();

        $this->sendOtp($request, $user);

        return response()->json([
            'otp_required' => true,
            'message' => 'A verification code was sent to your email address.',
        ]);
    }

    /**
     * Verify the pending login OTP and establish the authenticated session.
     */
    public function verifyOtp(Request $request): JsonResponse
    {
        $request->validate([
            'otp' => ['required', 'digits:6'],
        ]);

        $pending = $request->session()->get('login_otp');

        if (! $pending || now()->greaterThan($pending['expires_at'])) {
            $request->session()->forget('login_otp');

            throw ValidationException::withMessages([
                'otp' => 'This code has expired. Please request a new one.',
            ]);
        }

        if ($pending['attempts'] >= 5) {
            $request->session()->forget('login_otp');

            throw ValidationException::withMessages([
                'otp' => 'Too many incorrect attempts. Please log in again.',
            ]);
        }

        if (! Hash::check((string) $request->input('otp'), $pending['code'])) {
            $pending['attempts']++;
            $request->session()->put('login_otp', $pending);

            throw ValidationException::withMessages([
                'otp' => 'The verification code is incorrect.',
            ]);
        }

        $user = User::find($pending['user_id']);

        if (! $user || strtolower((string) $user->status) === 'inactive') {
            $request->session()->forget('login_otp');

            throw ValidationException::withMessages([
                'otp' => 'This account is no longer available.',
            ]);
        }

        Auth::login($user, (bool) ($pending['remember'] ?? false));
        $request->session()->forget('login_otp');
        $request->session()->regenerate();

        return response()->json([
            'success' => true,
            'redirect' => url('/admin'),
        ]);
    }

    /**
     * Send a fresh OTP for the pending login.
     */
    public function resendOtp(Request $request): JsonResponse
    {
        $pending = $request->session()->get('login_otp');
        $user = $pending ? User::find($pending['user_id']) : null;

        if (! $user) {
            throw ValidationException::withMessages([
                'otp' => 'Your login session has expired. Please log in again.',
            ]);
        }

        $this->sendOtp($request, $user, (bool) ($pending['remember'] ?? false));

        return response()->json([
            'success' => true,
            'message' => 'A new verification code was sent.',
        ]);
    }

    private function sendOtp(Request $request, User $user, bool $remember = false): void
    {
        $code = (string) random_int(100000, 999999);

        $request->session()->put('login_otp', [
            'user_id' => $user->id,
            'code' => Hash::make($code),
            'expires_at' => now()->addMinutes(10),
            'attempts' => 0,
            'remember' => $remember,
        ]);

        $displayName = $user->name ?: $user->full_name;

        Mail::send('emails.login-otp', [
            'displayName' => $displayName,
            'code' => $code,
        ], function ($message) use ($user) {
            $message->to($user->email)
                ->subject('Your login verification code');
        });
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        // Return JSON for AJAX requests, redirect for regular requests
        if ($request->expectsJson()) {
            return response()->json(['success' => true, 'message' => 'Logged out successfully']);
        }

        return redirect('/');
    }
}