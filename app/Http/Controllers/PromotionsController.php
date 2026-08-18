<?php

namespace App\Http\Controllers;

use App\Models\Promotion;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class PromotionsController extends Controller
{
    /**
     * Display a listing of the promotions (Admin view).
     */
    public function index()
    {
        return Inertia::render('admin/Promotions');
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
                  ->orWhere('date', 'LIKE', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->has('status')) {
            $now = now();
            if ($request->status === 'active') {
                $query->where('expire', '>=', $now);
            } elseif ($request->status === 'expired') {
                $query->where('expire', '<', $now);
            } elseif ($request->status === 'expiring_soon') {
                $query->where('expire', '>=', $now)
                      ->where('expire', '<=', $now->addDays(7));
            }
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
            'date' => 'required|date',
            'expire' => 'required|date|after:date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $promotion = Promotion::create([
                'title' => $request->title,
                'content' => $request->content,
                'date' => $request->date,
                'expire' => $request->expire,
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
            'date' => 'required|date',
            'expire' => 'required|date|after:date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $promotion = Promotion::findOrFail($id);
            $promotion->update([
                'title' => $request->title,
                'content' => $request->content,
                'date' => $request->date,
                'expire' => $request->expire,
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
        $now = now();
        
        $active = Promotion::where('expire', '>=', $now)->count();
        $expired = Promotion::where('expire', '<', $now)->count();
        $total = Promotion::count();
        $expiringSoon = Promotion::where('expire', '>=', $now)
            ->where('expire', '<=', $now->addDays(7))
            ->count();

        return response()->json([
            'active' => $active,
            'expired' => $expired,
            'total' => $total,
            'expiring_soon' => $expiringSoon
        ]);
    }

    /**
     * Get active promotions for public display (if needed for frontend).
     */
    public function getActivePromotions()
    {
        $promotions = Promotion::where('expire', '>=', now())
            ->orderBy('date', 'desc')
            ->limit(5)
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
            
            // For toggle, we can extend the expire date or set it to past
            // This is a simple implementation - you can customize as needed
            if ($promotion->isActive()) {
                // Deactivate: set expire to yesterday
                $promotion->expire = now()->subDay();
            } else {
                // Activate: set expire to 30 days from now
                $promotion->expire = now()->addDays(30);
            }
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
}