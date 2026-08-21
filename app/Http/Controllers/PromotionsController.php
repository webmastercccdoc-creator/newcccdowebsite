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

        $promotions = $query->orderBy('date', 'desc')->get();

        return response()->json($promotions);
    }

    /**
     * Return a single promotion as JSON.
     */
    public function apiShow($id)
    {
        $promotion = Promotion::findOrFail($id);
        return response()->json($promotion);
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
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120', // 5MB max
            'image_alt_text' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Handle image upload
            $imagePath = null;
            $imageAltText = $request->image_alt_text;

            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $filename = Str::slug($request->title) . '-' . time() . '.' . $image->getClientOriginalExtension();
                $imagePath = $image->storeAs('promotions', $filename, 'public');
                
                // If no alt text provided, use title
                if (!$imageAltText) {
                    $imageAltText = $request->title;
                }
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

            $promotion = Promotion::create([
                'title' => $request->title,
                'content' => $request->content,
                'image_path' => $imagePath,
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
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120', // 5MB max
            'image_alt_text' => 'nullable|string|max:255',
            'remove_image' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $promotion = Promotion::findOrFail($id);

            // Handle image upload
            $imagePath = $promotion->image_path;
            $imageAltText = $request->image_alt_text ?? $promotion->image_alt_text;

            // Check if image should be removed
            if ($request->has('remove_image') && $request->remove_image === 'true') {
                if ($promotion->image_path) {
                    Storage::disk('public')->delete($promotion->image_path);
                }
                $imagePath = null;
                $imageAltText = null;
            }

            if ($request->hasFile('image')) {
                // Delete old image if exists
                if ($promotion->image_path) {
                    Storage::disk('public')->delete($promotion->image_path);
                }

                $image = $request->file('image');
                $filename = Str::slug($request->title) . '-' . time() . '.' . $image->getClientOriginalExtension();
                $imagePath = $image->storeAs('promotions', $filename, 'public');
                
                // If no alt text provided, use title
                if (!$imageAltText) {
                    $imageAltText = $request->title;
                }
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
                'image_path' => $imagePath,
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
            
            // Delete image if exists
            if ($promotion->image_path) {
                Storage::disk('public')->delete($promotion->image_path);
            }
            
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
            ->get();

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
                if ($promotion->image_path) {
                    Storage::disk('public')->delete($promotion->image_path);
                }
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
            ->get();

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
}