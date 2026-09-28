<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\PopupSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class PopupController extends Controller
{
    /**
     * GET /admin/popup
     * Return the current popup settings.
     */
    public function show(): JsonResponse
    {
        $popup = PopupSetting::current();

        return response()->json($popup->toClientArray());
    }

    /**
     * POST /admin/popup
     * Create or update the popup settings.
     */
    public function update(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'enabled'       => ['nullable', 'boolean'],
                'title'         => ['nullable', 'string', 'max:255'],
                'caption'       => ['nullable', 'string', 'max:2000'],
                'link_url'      => ['nullable', 'string', 'max:2048', 'url'],
                'remove_image'  => ['nullable', 'boolean'],
                'image'         => [
                    'nullable',
                    'file',
                    'image',
                    'mimes:png,jpg,jpeg,webp,avif',
                    'max:5120', // 5MB
                ],
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors'  => $e->errors(),
            ], 422);
        }

        $popup = PopupSetting::current();

        // Handle image removal
        if ($request->boolean('remove_image')) {
            $this->deleteImageFile($popup);
            $popup->image_path = null;
        }

        // Handle new upload
        if ($request->hasFile('image')) {
            // Delete the old file first
            $this->deleteImageFile($popup);

            // Store under storage/app/public/popup/...
            $path = $request->file('image')->store('popup', 'public');
            $popup->image_path = $path;
        }

        // Update simple fields
        $popup->enabled  = $request->boolean('enabled');
        $popup->title    = $validated['title']    ?? null;
        $popup->caption  = $validated['caption']  ?? null;
        $popup->link_url = $validated['link_url'] ?? null;

        $popup->save();

        return response()->json([
            'message' => 'Popup settings saved successfully.',
            'popup'   => $popup->fresh()->toClientArray(),
        ]);
    }

    /**
     * Safely delete the stored image file.
     */
    protected function deleteImageFile(PopupSetting $popup): void
    {
        if (! $popup->image_path) {
            return;
        }

        // Skip if it's a full URL (external asset).
        if (preg_match('/^https?:\/\//i', $popup->image_path)) {
            return;
        }

        if (Storage::disk('public')->exists($popup->image_path)) {
            Storage::disk('public')->delete($popup->image_path);
        }
    }
}