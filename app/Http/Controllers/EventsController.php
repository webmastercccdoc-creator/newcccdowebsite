<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class EventsController extends Controller
{
    /**
     * Display a listing of the events (Admin view).
     */
    public function index()
    {
        return Inertia::render('admin/Events/Events');
    }

    /**
     * Return JSON list of events for API with participant counts.
     */
    public function apiIndex(Request $request)
    {
        try {
            $query = Event::query();

            // Filter by search query
            if ($request->has('search') && $request->search) {
                $search = $request->search;
                $query->where(function($q) use ($search) {
                    $q->where('title', 'LIKE', "%{$search}%")
                      ->orWhere('description', 'LIKE', "%{$search}%")
                      ->orWhere('location', 'LIKE', "%{$search}%")
                      ->orWhere('department', 'LIKE', "%{$search}%");
                });
            }

            // Filter by status
            if ($request->has('status') && $request->status !== 'all') {
                $query->where('status', $request->status);
            }

            $events = $query->withCount('participants')
                ->orderBy('date', 'desc')
                ->get()
                ->map(function ($event) {
                    return [
                        'id' => $event->id,
                        'title' => $event->title,
                        'description' => $event->description,
                        'location' => $event->location,
                        'date' => $event->date ? Carbon::parse($event->date)->format('Y-m-d') : null,
                        'time' => $event->time ? Carbon::parse($event->time)->format('H:i') : null,
                        'status' => $event->status,
                        'department' => $event->department,
                        'banner_image_url' => $event->banner_image_path ? asset('storage/' . $event->banner_image_path) : null,
                        'image_alt_text' => $event->image_alt_text,
                        'created_at' => $event->created_at,
                        'participants_count' => $event->participants_count ?? 0,
                    ];
                });

            return response()->json($events);
        } catch (\Exception $e) {
            \Log::error('Error fetching events: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to fetch events',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Return a single event as JSON with participants.
     */
    public function apiShow($id)
    {
        try {
            $event = Event::withCount('participants')->findOrFail($id);
            
            return response()->json([
                'id' => $event->id,
                'title' => $event->title,
                'description' => $event->description,
                'location' => $event->location,
                'date' => $event->date ? Carbon::parse($event->date)->format('Y-m-d') : null,
                'time' => $event->time ? Carbon::parse($event->time)->format('H:i') : null,
                'status' => $event->status,
                'department' => $event->department,
                'banner_image_url' => $event->banner_image_path ? asset('storage/' . $event->banner_image_path) : null,
                'image_alt_text' => $event->image_alt_text,
                'participants_count' => $event->participants_count ?? 0,
            ]);
        } catch (\Exception $e) {
            \Log::error('Error fetching event: ' . $e->getMessage());
            return response()->json([
                'error' => 'Event not found'
            ], 404);
        }
    }

    /**
     * Get active events for public display.
     */
    public function getActiveEvents()
    {
        try {
            $events = Event::withCount('participants')
                ->where('status', 'active')
                ->orderBy('date', 'asc')
                ->limit(10)
                ->get()
                ->map(function ($event) {
                    return [
                        'id' => $event->id,
                        'title' => $event->title,
                        'description' => $event->description,
                        'location' => $event->location,
                        'date' => $event->date ? Carbon::parse($event->date)->format('Y-m-d') : null,
                        'time' => $event->time ? Carbon::parse($event->time)->format('H:i') : null,
                        'banner_image_url' => $event->banner_image_path ? asset('storage/' . $event->banner_image_path) : null,
                        'participants_count' => $event->participants_count ?? 0,
                    ];
                });

            return response()->json($events);
        } catch (\Exception $e) {
            \Log::error('Error fetching active events: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to fetch active events'
            ], 500);
        }
    }

    /**
     * Get event status counts.
     */
    public function getStatusCounts()
    {
        try {
            $active = Event::where('status', 'active')->count();
            $upcoming = Event::where('status', 'upcoming')->count();
            $completed = Event::where('status', 'completed')->count();
            $cancelled = Event::where('status', 'cancelled')->count();
            $total = Event::count();

            return response()->json([
                'active' => $active,
                'upcoming' => $upcoming,
                'completed' => $completed,
                'cancelled' => $cancelled,
                'total' => $total,
            ]);
        } catch (\Exception $e) {
            \Log::error('Error fetching status counts: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to fetch status counts'
            ], 500);
        }
    }

    /**
     * Store a newly created event in storage.
     */
    public function store(Request $request)
    {
        // Check if user has permission to create events
        if (!$this->hasPermission('events')) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized: You do not have permission to create events'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'nullable|string|max:255',
            'date' => 'required|date',
            'time' => 'nullable|date_format:H:i',
            'status' => 'nullable|in:active,upcoming,completed,cancelled',
            'department' => 'nullable|string|max:255',
            'banner_image' => 'nullable|image|mimes:jpeg,png,webp|max:5120',
            'image_alt_text' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $bannerImagePath = $this->storeEventImage($request, 'banner_image');
            $imageAltText = $request->image_alt_text;
            if (!$imageAltText && $bannerImagePath) $imageAltText = $request->title;

            $event = Event::create([
                'title' => $request->title,
                'description' => $request->description,
                'location' => $request->location,
                'date' => $request->date,
                'time' => $request->time,
                'banner_image_path' => $bannerImagePath,
                'image_alt_text' => $imageAltText,
                'status' => $request->status ?? 'active',
                'department' => $request->department,
                'created_by' => auth()->id(),
            ]);

            return response()->json([
                'message' => 'Event created successfully',
                'event' => $event
            ], 201);
        } catch (\Exception $e) {
            \Log::error('Error creating event: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to create event',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified event in storage.
     */
    public function update(Request $request, $id)
    {
        // Check if user has permission to edit events
        if (!$this->hasPermission('events')) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized: You do not have permission to edit events'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'nullable|string|max:255',
            'date' => 'required|date',
            'time' => 'nullable|date_format:H:i',
            'status' => 'nullable|in:active,upcoming,completed,cancelled',
            'department' => 'nullable|string|max:255',
            'banner_image' => 'nullable|image|mimes:jpeg,png,webp|max:5120',
            'image_alt_text' => 'nullable|string|max:255',
            'remove_banner_image' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $event = Event::findOrFail($id);

            $bannerImagePath = $event->banner_image_path;
            $imageAltText = $request->image_alt_text ?? $event->image_alt_text;

            if ($request->boolean('remove_banner_image')) {
                $this->deleteEventImage($bannerImagePath);
                $bannerImagePath = null;
                $imageAltText = null;
            }

            if ($request->hasFile('banner_image')) {
                $this->deleteEventImage($bannerImagePath);
                $bannerImagePath = $this->storeEventImage($request, 'banner_image');
            }

            $event->update([
                'title' => $request->title,
                'description' => $request->description,
                'location' => $request->location,
                'date' => $request->date,
                'time' => $request->time,
                'banner_image_path' => $bannerImagePath,
                'image_alt_text' => $imageAltText,
                'status' => $request->status ?? $event->status,
                'department' => $request->department,
                'updated_by' => auth()->id(),
            ]);

            return response()->json([
                'message' => 'Event updated successfully',
                'event' => $event
            ]);
        } catch (\Exception $e) {
            \Log::error('Error updating event: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to update event',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified event from storage.
     */
    public function destroy($id)
    {
        // Check if user has permission to delete events
        if (!$this->hasPermission('user_management')) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized: You do not have permission to delete events'
            ], 403);
        }

        try {
            $event = Event::findOrFail($id);
            $this->deleteEventImage($event->banner_image_path);
            $event->delete();

            return response()->json([
                'success' => true,
                'message' => 'Event deleted successfully'
            ]);
        } catch (\Exception $e) {
            \Log::error('Error deleting event: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete event'
            ], 500);
        }
    }

    /**
     * Toggle event status (Active <-> Cancelled).
     */
    public function toggleStatus(Request $request, $id)
    {
        if (!$this->hasPermission('events')) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        try {
            $event = Event::findOrFail($id);
            
            if ($event->status === 'active') {
                $event->status = 'cancelled';
                $message = 'Event cancelled successfully';
            } else {
                $event->status = 'active';
                $message = 'Event activated successfully';
            }
            
            $event->updated_by = auth()->id();
            $event->save();

            return response()->json([
                'success' => true,
                'message' => $message,
                'event' => $event
            ]);
        } catch (\Exception $e) {
            \Log::error('Error toggling event status: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to update event status'
            ], 500);
        }
    }

    /**
     * Mark event as completed.
     */
    public function complete(Request $request, $id)
    {
        if (!$this->hasPermission('events')) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized: You do not have permission to complete events'
            ], 403);
        }

        try {
            $event = Event::findOrFail($id);
            
            if (!in_array($event->status, ['active', 'upcoming'])) {
                return response()->json([
                    'success' => false,
                    'message' => 'Only active or upcoming events can be marked as completed'
                ], 422);
            }

            $event->status = 'completed';
            $event->updated_by = auth()->id();
            $event->save();

            return response()->json([
                'success' => true,
                'message' => 'Event marked as completed successfully',
                'event' => $event
            ]);
        } catch (\Exception $e) {
            \Log::error('Error completing event: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to mark event as completed'
            ], 500);
        }
    }

    /**
     * Bulk delete events.
     */
    public function bulkDelete(Request $request)
    {
        if (!$this->hasPermission('user_management')) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'ids' => 'required|array',
            'ids.*' => 'exists:events,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $events = Event::whereIn('id', $request->ids)->get();
            foreach ($events as $event) {
                $this->deleteEventImage($event->banner_image_path);
            }
            Event::whereIn('id', $request->ids)->delete();

            return response()->json([
                'success' => true,
                'message' => 'Events deleted successfully'
            ]);
        } catch (\Exception $e) {
            \Log::error('Error bulk deleting events: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete events'
            ], 500);
        }
    }

    /**
     * Get event participants (view all participants for an event).
     */
    public function getParticipants($eventId)
    {
        if (!$this->hasPermission('events')) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        try {
            $event = Event::with('participants')->findOrFail($eventId);
            
            return response()->json([
                'success' => true,
                'data' => $event->participants,
                'total' => $event->participants->count()
            ]);
        } catch (\Exception $e) {
            \Log::error('Error fetching participants: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch participants'
            ], 500);
        }
    }

    /**
     * Store event image.
     */
    private function storeEventImage(Request $request, string $field): ?string
    {
        if (!$request->hasFile($field)) return null;

        $image = $request->file($field);
        $filename = Str::slug($request->title) . '-' . $field . '-' . time() . '.' . $image->getClientOriginalExtension();

        return Storage::disk('public')->putFileAs('events', $image, $filename);
    }

    /**
     * Delete event image.
     */
    private function deleteEventImage(?string $path): void
    {
        if ($path) Storage::disk('public')->delete($path);
    }

    /**
     * Helper method to check if user has a specific permission.
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
}