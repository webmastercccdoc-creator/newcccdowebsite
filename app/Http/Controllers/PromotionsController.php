<?php

namespace App\Http\Controllers;

use App\Models\Promotion;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

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
        // 🔥 First, update all promotion statuses based on date logic
        $this->updatePromotionStatuses();

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
            ->map(function ($promotion) {
                // Add image URLs and format dates
                $promotion = $this->addImageUrls($promotion);
                
                // Format dates
                $promotion->date = $promotion->date ? Carbon::parse($promotion->date)->format('Y-m-d') : null;
                $promotion->expire = $promotion->expire ? Carbon::parse($promotion->expire)->format('Y-m-d') : null;
                
                return $promotion;
            });

        return response()->json($promotions);
    }

    /**
     * 🔥 Update promotion statuses based on date logic
     * 
     * Logic:
     * - If both start and expiry dates are null → status = 'active'
     * - Else if current date is greater than expiry date → status = 'expired'
     * - Else if start date is less than or equal to current date → status = 'active'
     * - Else if start date is greater than current date → status = 'inactive'
     */
    private function updatePromotionStatuses()
    {
        $now = Carbon::now();
        
        // Get all promotions
        $promotions = Promotion::all();
        
        foreach ($promotions as $promotion) {
            $startDate = $promotion->date ? Carbon::parse($promotion->date) : null;
            $expiryDate = $promotion->expire ? Carbon::parse($promotion->expire) : null;
            
            $newStatus = null;
            
            // 🔥 Rule 1: If both start and expiry dates are null → status = 'active'
            if (!$startDate && !$expiryDate) {
                $newStatus = 'active';
            }
            // 🔥 Rule 2: Check expiry date first - if expired, status = 'expired'
            elseif ($expiryDate && $now->greaterThan($expiryDate)) {
                $newStatus = 'expired';
            } 
            // 🔥 Rule 3: Check start date - if start date is today or in the past, status = 'active'
            elseif ($startDate && $startDate->lessThanOrEqualTo($now)) {
                $newStatus = 'active';
            }
            // 🔥 Rule 4: Start date is in the future - status = 'inactive'
            elseif ($startDate && $startDate->greaterThan($now)) {
                $newStatus = 'inactive';
            }
            // 🔥 Rule 5: Only expiry date exists and not expired - status = 'active'
            elseif ($expiryDate && $now->lessThanOrEqualTo($expiryDate)) {
                $newStatus = 'active';
            }
            // Default fallback
            else {
                $newStatus = 'inactive';
            }
            
            // Update status if changed
            if ($newStatus && $promotion->status !== $newStatus) {
                $promotion->status = $newStatus;
                $promotion->save();
            }
        }
    }

    /**
     * Return a single promotion as JSON.
     */
    public function apiShow($id)
    {
        // 🔥 Update statuses before showing
        $this->updatePromotionStatuses();
        
        $promotion = Promotion::findOrFail($id);
        $promotion = $this->addImageUrls($promotion);
        
        // Format dates
        $promotion->date = $promotion->date ? Carbon::parse($promotion->date)->format('Y-m-d') : null;
        $promotion->expire = $promotion->expire ? Carbon::parse($promotion->expire)->format('Y-m-d') : null;
        
        return response()->json($promotion);
    }

    /**
     * Store a newly created promotion in storage.
     */
    public function store(Request $request)
    {
        // Check if user has permission to create promotions
        if (!$this->hasPermission('promotions')) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized: You do not have permission to create promotions'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'date' => 'nullable|date',
            'expire' => 'nullable|date|after_or_equal:date',
            'status' => 'nullable|in:active,inactive,expired',
            'link' => 'nullable|url',
            'department' => 'nullable|string|max:255',
            'banner_image' => 'nullable|image|mimes:jpeg,png,webp|max:5120',
            'carousel_image' => 'nullable|image|mimes:jpeg,png,webp|max:5120',
            'image_alt_text' => 'nullable|string|max:255',
        ]);

        $validator->after(function ($validator) use ($request) {
            foreach (['banner_image', 'carousel_image'] as $field) {
                if ($request->hasFile($field) && !$request->file($field)->isValid()) {
                    $validator->errors()->add($field, 'The uploaded image could not be read. Please try selecting the file again.');
                }
            }
        });

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

            // 🔥 Calculate status based on dates
            $status = $this->calculateStatus($date, $expire);

            $promotion = Promotion::create([
                'title' => $request->title,
                'content' => $request->content,
                'image_path' => $bannerImagePath,
                'banner_image_path' => $bannerImagePath,
                'carousel_image_path' => $carouselImagePath,
                'image_alt_text' => $imageAltText,
                'date' => $date,
                'expire' => $expire,
                'status' => $status,
                'link' => $request->link,
                'department' => $request->department,
                'created_by' => auth()->id(),
            ]);

            // Format dates for response
            $promotion->date = $promotion->date ? Carbon::parse($promotion->date)->format('Y-m-d') : null;
            $promotion->expire = $promotion->expire ? Carbon::parse($promotion->expire)->format('Y-m-d') : null;

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
        // Check if user has permission to edit promotions
        if (!$this->hasPermission('promotions')) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized: You do not have permission to edit promotions'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'date' => 'nullable|date',
            'expire' => 'nullable|date|after_or_equal:date',
            'status' => 'nullable|in:active,inactive,expired',
            'link' => 'nullable|url',
            'department' => 'nullable|string|max:255',
            'banner_image' => 'nullable|image|mimes:jpeg,png,webp|max:5120',
            'carousel_image' => 'nullable|image|mimes:jpeg,png,webp|max:5120',
            'image_alt_text' => 'nullable|string|max:255',
            'remove_banner_image' => 'nullable|boolean',
            'remove_carousel_image' => 'nullable|boolean',
        ]);

        $validator->after(function ($validator) use ($request) {
            foreach (['banner_image', 'carousel_image'] as $field) {
                if ($request->hasFile($field) && !$request->file($field)->isValid()) {
                    $validator->errors()->add($field, 'The uploaded image could not be read. Please try selecting the file again.');
                }
            }
        });

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

            // 🔥 Calculate status based on dates
            $status = $this->calculateStatus($date, $expire);

            $promotion->update([
                'title' => $request->title,
                'content' => $request->content,
                'image_path' => $bannerImagePath,
                'banner_image_path' => $bannerImagePath,
                'carousel_image_path' => $carouselImagePath,
                'image_alt_text' => $imageAltText,
                'date' => $date,
                'expire' => $expire,
                'status' => $status,
                'link' => $request->link,
                'department' => $request->department,
                'updated_by' => auth()->id(),
            ]);

            // Format dates for response
            $promotion->date = $promotion->date ? Carbon::parse($promotion->date)->format('Y-m-d') : null;
            $promotion->expire = $promotion->expire ? Carbon::parse($promotion->expire)->format('Y-m-d') : null;

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
     * 🔥 Calculate status based on date logic
     * 
     * Logic:
     * 1. If both start and expiry dates are null → 'active'
     * 2. Else if expiry date exists AND current date > expiry date → 'expired'
     * 3. Else if start date exists AND start date <= current date → 'active'
     * 4. Else if start date exists AND start date > current date → 'inactive'
     * 5. Else if only expiry date exists AND not expired → 'active'
     * 6. Default → 'inactive'
     * 
     * @param string|null $startDate
     * @param string|null $expiryDate
     * @return string
     */
    private function calculateStatus($startDate, $expiryDate)
    {
        $now = Carbon::now();
        
        $start = $startDate ? Carbon::parse($startDate) : null;
        $expiry = $expiryDate ? Carbon::parse($expiryDate) : null;
        
        // 🔥 Rule 1: If both start and expiry dates are null → status = 'active'
        if (!$start && !$expiry) {
            return 'active';
        }
        
        // 🔥 Rule 2: Check expiry date - if expired, status = 'expired'
        if ($expiry && $now->greaterThan($expiry)) {
            return 'expired';
        }
        
        // 🔥 Rule 3 & 4: Check start date
        if ($start) {
            // Start date is today or in the past → Active
            if ($start->lessThanOrEqualTo($now)) {
                return 'active';
            } 
            // Start date is in the future → Inactive
            else {
                return 'inactive';
            }
        }
        
        // 🔥 Rule 5: Only expiry date exists and not expired → Active
        if ($expiry && $now->lessThanOrEqualTo($expiry)) {
            return 'active';
        }
        
        // 🔥 Rule 6: Default fallback
        return 'inactive';
    }

    /**
     * Remove the specified promotion from storage.
     */
    public function destroy($id)
    {
        // Check if user has permission to delete promotions
        if (!$this->hasPermission('user_management')) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized: You do not have permission to delete promotions'
            ], 403);
        }

        try {
            $promotion = Promotion::findOrFail($id);
            
            $this->deletePromotionImage($promotion->banner_image_path ?: $promotion->image_path);
            $this->deletePromotionImage($promotion->carousel_image_path);
            
            $promotion->delete();

            return response()->json([
                'success' => true,
                'message' => 'Promotion deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
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
        // 🔥 Update statuses before counting
        $this->updatePromotionStatuses();
        
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
        // 🔥 Update statuses before fetching
        $this->updatePromotionStatuses();
        
        $promotions = Promotion::where('status', 'active')
            ->where(function($query) {
                $query->whereNull('expire')
                      ->orWhere('expire', '>=', now());
            })
            ->orderBy('date', 'desc')
            ->limit(6)
            ->get()
            ->map(function ($promotion) {
                $promotion = $this->addImageUrls($promotion);
                $promotion->date = $promotion->date ? Carbon::parse($promotion->date)->format('Y-m-d') : null;
                $promotion->expire = $promotion->expire ? Carbon::parse($promotion->expire)->format('Y-m-d') : null;
                return $promotion;
            });

        return response()->json($promotions);
    }

    /**
     * Bulk delete promotions.
     */
    public function bulkDelete(Request $request)
    {
        // Check if user has permission to delete promotions
        if (!$this->hasPermission('user_management')) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized: You do not have permission to delete promotions'
            ], 403);
        }

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
                'success' => true,
                'message' => 'Promotions deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete promotions',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Toggle promotion status (activate/deactivate) - Manual override.
     */
    public function toggleStatus(Request $request, $id)
    {
        // Check if user has permission to manage promotions
        if (!$this->hasPermission('promotions')) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized: You do not have permission to change promotion status'
            ], 403);
        }

        try {
            $promotion = Promotion::findOrFail($id);
            
            // 🔥 Check if promotion is expired before allowing activation
            $now = Carbon::now();
            $expiryDate = $promotion->expire ? Carbon::parse($promotion->expire) : null;
            
            if ($expiryDate && $now->greaterThan($expiryDate)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Cannot activate an expired promotion. Please update the expiry date first.'
                ], 400);
            }
            
            if ($promotion->status === 'active') {
                $promotion->status = 'inactive';
                $message = 'Promotion deactivated successfully';
            } else {
                // Check if start date is in the future
                $startDate = $promotion->date ? Carbon::parse($promotion->date) : null;
                if ($startDate && $startDate->greaterThan($now)) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Cannot activate a promotion with a future start date. Please update the start date first.'
                    ], 400);
                }
                $promotion->status = 'active';
                $message = 'Promotion activated successfully';
            }
            
            $promotion->updated_by = auth()->id();
            $promotion->save();

            return response()->json([
                'success' => true,
                'message' => $message,
                'promotion' => $promotion
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update promotion status',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update promotion status specifically - Manual override.
     */
    public function updateStatus(Request $request, $id)
    {
        // Check if user has permission to manage promotions
        if (!$this->hasPermission('promotions')) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized: You do not have permission to update promotion status'
            ], 403);
        }

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
            
            // 🔥 Validate status change based on dates
            $now = Carbon::now();
            $startDate = $promotion->date ? Carbon::parse($promotion->date) : null;
            $expiryDate = $promotion->expire ? Carbon::parse($promotion->expire) : null;
            
            if ($request->status === 'active') {
                if ($expiryDate && $now->greaterThan($expiryDate)) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Cannot activate an expired promotion. Please update the expiry date first.'
                    ], 400);
                }
                if ($startDate && $startDate->greaterThan($now)) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Cannot activate a promotion with a future start date. Please update the start date first.'
                    ], 400);
                }
            }
            
            $promotion->status = $request->status;
            $promotion->updated_by = auth()->id();
            $promotion->save();

            return response()->json([
                'success' => true,
                'message' => 'Promotion status updated successfully',
                'promotion' => $promotion
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
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
        // 🔥 Update statuses before fetching
        $this->updatePromotionStatuses();
        
        $promotions = Promotion::where('department', $department)
            ->where('status', 'active')
            ->where(function($query) {
                $query->whereNull('expire')
                      ->orWhere('expire', '>=', now());
            })
            ->orderBy('date', 'desc')
            ->get()
            ->map(function ($promotion) {
                $promotion = $this->addImageUrls($promotion);
                $promotion->date = $promotion->date ? Carbon::parse($promotion->date)->format('Y-m-d') : null;
                $promotion->expire = $promotion->expire ? Carbon::parse($promotion->expire)->format('Y-m-d') : null;
                return $promotion;
            });

        return response()->json($promotions);
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

    /**
     * Helper method to check if user has a specific permission
     * 
     * @param string $permission
     * @return bool
     */
    private function hasPermission($permission)
    {
        $user = Auth::user();
        
        if (!$user) {
            return false;
        }

        return DB::table('access_controls')
            ->where('user_id', $user->id)
            ->where('permission', $permission)
            ->exists();
    }

    // ============================================
    // PRIVATE HELPER METHODS
    // ============================================

    private function storePromotionImage(Request $request, string $field): ?string
    {
        if (!$request->hasFile($field)) return null;

        $image = $request->file($field);
        $filename = Str::slug($request->title) . '-' . $field . '-' . time() . '.' . $image->getClientOriginalExtension();

        return Storage::disk('public')->putFileAs('promotions', $image, $filename);
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
}