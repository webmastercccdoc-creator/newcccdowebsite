<?php

namespace App\Http\Controllers;

use App\Models\Promotion;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PromotionsController extends Controller
{
    /**
     * Display a listing of the promotions (Admin view).
     */
    public function index()
    {
        return Inertia::render('admin/promotions/Promotions');
    }

    /**
     * Return JSON list of promotions for API.
     */
    public function apiIndex(Request $request)
    {
        $query = Promotion::query();

        // Filter by search query
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'LIKE', "%{$search}%")
                  ->orWhere('content', 'LIKE', "%{$search}%")
                  ->orWhere('date', 'LIKE', "%{$search}%")
                  ->orWhere('department', 'LIKE', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Filter by department
        if ($request->has('department') && $request->department) {
            $query->where('department', $request->department);
        }

        $promotions = $query->orderBy('date', 'desc')->get()
            ->map(fn ($promotion) => $this->addImageUrls($promotion));

        return response()->json($promotions);
    }

    /**
     * Return a single promotion as JSON.
     */
    public function apiShow($id)
    {
        $promotion = Promotion::findOrFail($id);
        return response()->json($this->addImageUrls($promotion));
    }

    /**
     * Store a newly created promotion in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'date' => 'nullable|date',
            'expire' => 'nullable|date',
            'status' => 'nullable|in:active,inactive,expired',
            'link' => 'nullable|url',
            'department' => 'nullable|string|max:255',
            'banner_image' => 'nullable|image|mimes:jpeg,png,webp|max:5120',
            'carousel_image' => 'nullable|image|mimes:jpeg,png,webp|max:5120',
            'image_alt_text' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $bannerImagePath = $this->storePromotionImage($request, 'banner_image');
            $carouselImagePath = $this->storePromotionImage($request, 'carousel_image');
            $imageAltText = $request->image_alt_text;
            if (!$imageAltText && ($bannerImagePath || $carouselImagePath)) $imageAltText = $request->title;

            // Convert empty strings to null for date fields
            $date = $request->date ?: null;
            $expire = $request->expire ?: null;

            // Validate date relationship only if both exist
            if ($date && $expire && $expire < $date) {
                return response()->json([
                    'errors' => [
                        'expire' => ['The expiry date must be after the start date.']
                    ]
                ], 422);
            }

            $promotion = Promotion::create([
                'title' => $request->title,
                'content' => $request->content,
                'image_path' => $bannerImagePath,
                'banner_image_path' => $bannerImagePath,
                'carousel_image_path' => $carouselImagePath,
                'image_alt_text' => $imageAltText,
                'date' => $date,
                'expire' => $expire,
                'status' => $request->status ?? 'active',
                'link' => $request->link,
                'department' => $request->department,
                'created_by' => auth()->id(),
            ]);

            return response()->json([
                'message' => 'Promotion created successfully',
                'promotion' => $promotion
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create promotion',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified promotion in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'date' => 'nullable|date',
            'expire' => 'nullable|date',
            'status' => 'nullable|in:active,inactive,expired',
            'link' => 'nullable|url',
            'department' => 'nullable|string|max:255',
            'banner_image' => 'nullable|image|mimes:jpeg,png,webp|max:5120',
            'carousel_image' => 'nullable|image|mimes:jpeg,png,webp|max:5120',
            'image_alt_text' => 'nullable|string|max:255',
            'remove_banner_image' => 'nullable|boolean',
            'remove_carousel_image' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $promotion = Promotion::findOrFail($id);

            $bannerImagePath = $promotion->banner_image_path ?: $promotion->image_path;
            $carouselImagePath = $promotion->carousel_image_path;
            $imageAltText = $request->image_alt_text ?? $promotion->image_alt_text;

            if ($request->boolean('remove_banner_image')) {
                $this->deletePromotionImage($bannerImagePath);
                $bannerImagePath = null;
                $imageAltText = null;
            }

            if ($request->boolean('remove_carousel_image')) {
                $this->deletePromotionImage($carouselImagePath);
                $carouselImagePath = null;
            }

            if ($request->hasFile('banner_image')) {
                $this->deletePromotionImage($bannerImagePath);
                $bannerImagePath = $this->storePromotionImage($request, 'banner_image');
            }

            if ($request->hasFile('carousel_image')) {
                $this->deletePromotionImage($carouselImagePath);
                $carouselImagePath = $this->storePromotionImage($request, 'carousel_image');
            }

            // Convert empty strings to null for date fields
            $date = $request->date ?: null;
            $expire = $request->expire ?: null;

            // Validate date relationship only if both exist
            if ($date && $expire && $expire < $date) {
                return response()->json([
                    'errors' => [
                        'expire' => ['The expiry date must be after the start date.']
                    ]
                ], 422);
            }

            $promotion->update([
                'title' => $request->title,
                'content' => $request->content,
                'image_path' => $bannerImagePath,
                'banner_image_path' => $bannerImagePath,
                'carousel_image_path' => $carouselImagePath,
                'image_alt_text' => $imageAltText,
                'date' => $date,
                'expire' => $expire,
                'status' => $request->status ?? $promotion->status,
                'link' => $request->link,
                'department' => $request->department,
                'updated_by' => auth()->id(),
            ]);

            return response()->json([
                'message' => 'Promotion updated successfully',
                'promotion' => $promotion
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update promotion',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified promotion from storage.
     */
    public function destroy($id)
    {
        try {
            $promotion = Promotion::findOrFail($id);
            
            $this->deletePromotionImage($promotion->banner_image_path ?: $promotion->image_path);
            $this->deletePromotionImage($promotion->carousel_image_path);
            
            $promotion->delete();

            return response()->json([
                'message' => 'Promotion deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete promotion',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get promotions status counts for dashboard.
     */
    public function getStatusCounts()
    {
        $active = Promotion::where('status', 'active')->count();
        $inactive = Promotion::where('status', 'inactive')->count();
        $expired = Promotion::where('status', 'expired')->count();
        $total = Promotion::count();

        return response()->json([
            'active' => $active,
            'inactive' => $inactive,
            'expired' => $expired,
            'total' => $total,
        ]);
    }

    /**
     * Get active promotions for public display.
     */
    public function getActivePromotions()
    {
        $promotions = Promotion::where('status', 'active')
            ->where(function($query) {
                $query->whereNull('expire')
                      ->orWhere('expire', '>=', now());
            })
            ->orderBy('date', 'desc')
            ->limit(6)
            ->get()
            ->map(fn ($promotion) => $this->addImageUrls($promotion));

        return response()->json($promotions);
    }

    /**
     * Bulk delete promotions.
     */
    public function bulkDelete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ids' => 'required|array',
            'ids.*' => 'exists:promotions,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Delete images for all promotions
            $promotions = Promotion::whereIn('id', $request->ids)->get();
            foreach ($promotions as $promotion) {
                $this->deletePromotionImage($promotion->banner_image_path ?: $promotion->image_path);
                $this->deletePromotionImage($promotion->carousel_image_path);
            }

            Promotion::whereIn('id', $request->ids)->delete();

            return response()->json([
                'message' => 'Promotions deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete promotions',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Toggle promotion status (activate/deactivate).
     */
    public function toggleStatus(Request $request, $id)
    {
        try {
            $promotion = Promotion::findOrFail($id);
            
            if ($promotion->status === 'active') {
                $promotion->status = 'inactive';
                $message = 'Promotion deactivated successfully';
            } else {
                $promotion->status = 'active';
                $message = 'Promotion activated successfully';
            }
            
            $promotion->updated_by = auth()->id();
            $promotion->save();

            return response()->json([
                'message' => $message,
                'promotion' => $promotion
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update promotion status',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update promotion status specifically.
     */
    public function updateStatus(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:active,inactive,expired'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $promotion = Promotion::findOrFail($id);
            $promotion->status = $request->status;
            $promotion->updated_by = auth()->id();
            $promotion->save();

            return response()->json([
                'message' => 'Promotion status updated successfully',
                'promotion' => $promotion
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update promotion status',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get promotions by department.
     */
    public function getByDepartment($department)
    {
        $promotions = Promotion::where('department', $department)
            ->where('status', 'active')
            ->where(function($query) {
                $query->whereNull('expire')
                      ->orWhere('expire', '>=', now());
            })
            ->orderBy('date', 'desc')
            ->get()
            ->map(fn ($promotion) => $this->addImageUrls($promotion));

        return response()->json($promotions);
    }

    private function storePromotionImage(Request $request, string $field): ?string
    {
        if (!$request->hasFile($field)) return null;

        $image = $request->file($field);
        $filename = Str::slug($request->title) . '-' . $field . '-' . time() . '.' . $image->getClientOriginalExtension();

        return $image->storeAs('promotions', $filename, 'public');
    }

    private function deletePromotionImage(?string $path): void
    {
        if ($path) Storage::disk('public')->delete($path);
    }

    private function addImageUrls(Promotion $promotion): Promotion
    {
        $bannerPath = $promotion->banner_image_path ?: $promotion->image_path;

        $promotion->banner_image_url = $this->imageUrl($bannerPath);
        $promotion->carousel_image_url = $this->imageUrl($promotion->carousel_image_path ?: $bannerPath);

        return $promotion;
    }

    private function imageUrl(?string $path): ?string
    {
        if (!$path) return null;
        return filter_var($path, FILTER_VALIDATE_URL) ? $path : asset('storage/' . $path);
    }

    /**
     * Get all departments that have promotions.
     */
    public function getDepartments()
    {
        $departments = Promotion::select('department')
            ->whereNotNull('department')
            ->distinct()
            ->pluck('department');

        return response()->json($departments);
    }
}