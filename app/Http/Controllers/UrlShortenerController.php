<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Url;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class UrlShortenerController extends Controller
{
    /**
     * Display the URL shortener page
     */
    public function index()
    {
        return Inertia::render('content/Quicklinks/UrlShortener');
    }

    /**
     * Shorten a URL
     */
    public function shorten(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'long_url' => 'required|url|max:2048',
            'path' => 'nullable|alpha_dash|max:100|min:3',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors(),
                'message' => 'Validation failed.'
            ], 422);
        }

        $longUrl = $this->normalizeUrl($request->input('long_url'));
        $customPath = $request->input('path');

        // Check if URL already exists
        $existingUrl = Url::where('long_url', $longUrl)->first();

        if ($existingUrl) {
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
        ]);

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
        
        $url->increment('clicks');
        return redirect($url->long_url, 302);
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
    private function validateCustomPath($path)
    {
        $path = trim($path, '/');
        $path = preg_replace('/[^a-zA-Z0-9_-]/', '', $path);
        
        if (empty($path) || Url::where('short_code', $path)->exists()) {
            return null;
        }
        
        return $path;
    }

    /**
     * Format success response
     */
    private function formatSuccessResponse($url, $message)
    {
        $domain = config('app.url');
        
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'short_url' => $domain . '/' . $url->short_code,
            'short_code' => $url->short_code,
            'long_url' => $url->long_url,
            'qr_code' => $this->generateQrCode($url->short_code, $domain),
            'clicks' => $url->clicks,
            'created_at' => $url->created_at->toDateTimeString(),
        ]);
    }

    /**
     * Generate QR code
     */
    private function generateQrCode($shortCode, $domain)
    {
        try {
            // Using QR Server API (free)
            $url = urlencode($domain . '/' . $shortCode);
            return "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data={$url}";
        } catch (\Exception $e) {
            return 'data:image/svg+xml;base64,' . base64_encode(
                '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
                    <rect width="200" height="200" fill="#fff"/>
                    <text x="100" y="100" text-anchor="middle" font-family="Arial" font-size="14" fill="#333">QR Code</text>
                    <text x="100" y="120" text-anchor="middle" font-family="Arial" font-size="10" fill="#666">' . $shortCode . '</text>
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