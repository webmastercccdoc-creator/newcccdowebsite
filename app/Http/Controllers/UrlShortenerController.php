<?php

namespace App\Http\Controllers;

use App\Models\Url;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;

class UrlShortenerController extends Controller
{
    /**
     * Display the URL shortener page
     */
    public function index()
    {
        return Inertia::render('admin/Url/Url');
    }

    /**
     * List shortened URLs for the admin page.
     */
    public function list()
    {
        $domain = rtrim(config('app.url'), '/');

        return response()->json([
            'urls' => Url::latest()->get()->map(function ($url) use ($domain) {
                return [
                    'id' => $url->id,
                    'short_code' => $url->short_code,
                    'short_url' => $domain . '/' . $url->short_code,
                    'original_url' => $url->long_url,
                    'clicks' => $url->clicks,
                    'status' => $url->status,
                    'created_at' => $url->created_at,
                ];
            }),
        ]);
    }

    /**
     * Delete a shortened URL from the admin page.
     */
    public function destroy($id)
    {
        $url = Url::findOrFail($id);
        $url->delete();

        return response()->json(['success' => true]);
    }

    /**
     * Update a shortened URL from the admin page.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'original_url' => 'required|url|max:2048',
            'path' => 'nullable|alpha_dash|max:100|min:3',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors(),
                'message' => 'Validation failed.',
            ], 422);
        }

        $url = Url::findOrFail($id);
        $shortCode = $url->short_code;

        if ($request->filled('path')) {
            $shortCode = $this->validateCustomPath($request->input('path'), $url->id);

            if (!$shortCode) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'That custom code is already in use. Please choose another one.',
                ], 422);
            }
        }

        $url->update([
            'long_url' => $this->normalizeUrl($request->input('original_url')),
            'short_code' => $shortCode,
        ]);

        return $this->formatSuccessResponse($url, 'Shortened URL updated successfully.');
    }

    /**
     * Shorten a URL
     */
    public function shorten(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'long_url' => 'required_without:original_url|nullable|url|max:2048',
            'original_url' => 'required_without:long_url|nullable|url|max:2048',
            'path' => 'nullable|alpha_dash|max:100|min:3',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors(),
                'message' => 'Validation failed.'
            ], 422);
        }

        $longUrl = $this->normalizeUrl($request->input('long_url') ?? $request->input('original_url'));
        $customPath = $request->input('path');

        // Check if URL already exists
        $existingUrl = Url::where('long_url', $longUrl)->first();

        if ($existingUrl) {
            if ($customPath) {
                $customShortCode = $this->validateCustomPath($customPath, $existingUrl->id);

                if (!$customShortCode) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'That custom code is already in use. Please choose another one.',
                    ], 422);
                }

                $existingUrl->update(['short_code' => $customShortCode]);
            }

            return $this->formatSuccessResponse($existingUrl, 'URL already shortened. Here is your existing link.');
        }

        // Generate short code
        $shortCode = $customPath 
            ? $this->validateCustomPath($customPath) 
            : $this->generateShortCode();

        if (!$shortCode) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unable to generate a unique short code. Please try again.'
            ], 500);
        }

        // Create the URL record
        $url = Url::create([
            'long_url' => $longUrl,
            'short_code' => $shortCode,
            'clicks' => 0,
            'status' => 'pending',
        ]);

        $domain = rtrim(config('app.url'), '/');
        $shortUrl = $domain . '/' . $url->short_code;
        $approverEmails = $this->getApproverEmails();
        $adminMail = config('mail.from.address');

        foreach (array_unique(array_values(array_filter(array_merge($approverEmails, [$adminMail])))) as $recipient) {
            Mail::send('emails.url-pending-approver', [
                'url' => $url,
                'shortUrl' => $shortUrl,
            ], function ($message) use ($recipient, $url) {
                $message->to($recipient)
                    ->subject('Pending shortened URL approval: ' . $url->short_code);
            });
        }

        return $this->formatSuccessResponse($url, 'Your shortened URL is ready!');
    }

    /**
     * Lookup a URL
     */
    public function lookup(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'url' => 'required|string|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors(),
                'message' => 'Validation failed.'
            ], 422);
        }

        $input = trim($request->input('url'));
        $url = null;

        // Case 1: Full short URL with domain
        if (strpos($input, 'citycollegecdo.edu.ph') !== false) {
            $parsed = parse_url($input);
            $path = trim($parsed['path'] ?? '', '/');
            if (!empty($path)) {
                $segments = explode('/', $path);
                $shortCode = end($segments);
                $url = Url::where('short_code', $shortCode)->first();
            }
        }

        // Case 2: Just a short code
        if (!$url && preg_match('/^[a-zA-Z0-9_-]+$/', $input)) {
            $url = Url::where('short_code', $input)->first();
        }

        // Case 3: Long URL
        if (!$url) {
            $normalized = $this->normalizeUrl($input);
            $url = Url::where('long_url', $normalized)->first();
            
            if (!$url) {
                $url = Url::where('long_url', 'LIKE', '%' . $input . '%')->first();
            }
        }

        if (!$url) {
            return response()->json([
                'status' => 'not_found',
                'message' => 'No shortened URL found for the provided link.'
            ], 404);
        }

        if ($url->status !== 'approved') {
            return response()->json([
                'status' => 'pending',
                'message' => 'This shortened URL is not available until it is approved.',
            ], 403);
        }

        // Increment click count
        $url->increment('clicks');

        return $this->formatSuccessResponse($url, 'URL found!');
    }

    /**
     * Redirect to the long URL
     */
    public function redirect($shortCode)
    {
        $url = Url::where('short_code', $shortCode)->first();
        
        if (!$url) {
            abort(404, 'URL not found');
        }

        if ($url->status !== 'approved') {
            abort(403, 'This shortened URL is not available until it is approved.');
        }
        
        $url->increment('clicks');
        return redirect($url->long_url, 302);
    }

    /**
     * Approve or reject a shortened URL.
     */
    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:approved,rejected',
        ]);

        $url = Url::findOrFail($id);
        $url->update(['status' => $validated['status']]);

        $domain = rtrim(config('app.url'), '/');
        $shortUrl = $domain . '/' . $url->short_code;
        $approverEmails = $this->getApproverEmails();
        $adminMail = config('mail.from.address');
        $recipients = array_unique(array_values(array_filter(array_merge($approverEmails, [$adminMail]))));

        foreach ($recipients as $recipient) {
            $view = $validated['status'] === 'approved'
                ? 'emails.url-approved'
                : 'emails.url-rejected';

            Mail::send($view, [
                'url' => $url,
                'shortUrl' => $shortUrl,
            ], function ($message) use ($recipient, $url, $validated) {
                $subject = $validated['status'] === 'approved'
                    ? 'Shortened URL approved: ' . $url->short_code
                    : 'Shortened URL rejected: ' . $url->short_code;

                $message->to($recipient)
                    ->subject($subject);
            });
        }

        return response()->json([
            'success' => true,
            'status' => $url->status,
            'message' => 'URL status updated successfully.',
        ]);
    }

    /**
     * Return all users who carry the article approver permission.
     */
    private function getApproverEmails(): array
    {
        $approverIds = DB::table('access_controls')
            ->where('permission', 'approve_articles')
            ->pluck('user_id')
            ->unique()
            ->values()
            ->all();

        if (empty($approverIds)) {
            return [];
        }

        return User::query()
            ->whereIn('id', $approverIds)
            ->whereNotNull('email')
            ->where('email', '!=', '')
            ->pluck('email')
            ->filter()
            ->unique()
            ->values()
            ->all();
    }

    /**
     * Generate a unique short code
     */
    private function generateShortCode()
    {
        for ($i = 0; $i < 5; $i++) {
            $code = Str::random(6);
            $code = preg_replace('/[^a-zA-Z0-9]/', '', $code);
            
            if (!Url::where('short_code', $code)->exists()) {
                return $code;
            }
        }
        
        $code = substr(base_convert(time() . rand(100, 999), 10, 36), -6);
        
        if (!Url::where('short_code', $code)->exists()) {
            return $code;
        }
        
        return null;
    }

    /**
     * Validate and return custom path
     */
    private function validateCustomPath($path, $ignoreId = null)
    {
        $path = trim($path, '/');
        $path = preg_replace('/[^a-zA-Z0-9_-]/', '', $path);

        $existingCodeQuery = Url::where('short_code', $path);
        if ($ignoreId !== null) {
            $existingCodeQuery->where('id', '!=', $ignoreId);
        }

        if (empty($path) || $existingCodeQuery->exists()) {
            return null;
        }
        
        return $path;
    }

    /**
     * Format success response
     */
    private function formatSuccessResponse($url, $message)
    {
        $domain = rtrim(config('app.url'), '/');
        $shortUrl = $domain . '/' . $url->short_code;
        
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'success' => true,
            'short_url' => $shortUrl,
            'shortened_url' => $shortUrl,
            'short_code' => $url->short_code,
            'long_url' => $url->long_url,
            'url_status' => $url->status,
            'qr_code' => $this->generateQrCode($shortUrl),
            'clicks' => $url->clicks,
            'created_at' => $url->created_at->toDateTimeString(),
        ]);
    }

    /**
     * Generate QR code
     */
    private function generateQrCode($shortUrl)
    {
        try {
            // Using QR Server API (free)
            $url = urlencode($shortUrl);
            return "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data={$url}";
        } catch (\Exception $e) {
            return 'data:image/svg+xml;base64,' . base64_encode(
                '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
                    <rect width="200" height="200" fill="#fff"/>
                    <text x="100" y="100" text-anchor="middle" font-family="Arial" font-size="14" fill="#333">QR Code</text>
                    <text x="100" y="120" text-anchor="middle" font-family="Arial" font-size="10" fill="#666">' . $shortUrl . '</text>
                </svg>'
            );
        }
    }

    /**
     * Normalize URL
     */
    private function normalizeUrl($url)
    {
        $url = trim($url);
        
        if (!preg_match('/^https?:\/\//', $url)) {
            $url = 'https://' . $url;
        }
        
        return rtrim($url, '/');
    }
}