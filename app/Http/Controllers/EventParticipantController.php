<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventParticipant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class EventParticipantController extends Controller
{
    /**
     * Get all participants for a specific event.
     */
    public function index($eventId)
    {
        if (!$this->hasPermission('events')) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        try {
            $event = Event::findOrFail($eventId);
            $participants = $event->participants()
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $participants,
                'total' => $participants->count()
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching participants: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch participants'
            ], 500);
        }
    }

    /**
     * Store a new participant for an event.
     */
    public function store(Request $request, $eventId)
    {
        if (!$this->hasPermission('events')) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'department' => 'nullable|string|max:255',
            'role' => 'nullable|in:participant,speaker,organizer,attendee',
            'status' => 'nullable|in:registered,confirmed,attended,no_show',
            'phone' => 'nullable|string|max:20',
            'notes' => 'nullable|string|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $event = Event::findOrFail($eventId);

            // Check for duplicate email
            if ($request->email) {
                $existing = EventParticipant::where('event_id', $eventId)
                    ->where('email', $request->email)
                    ->first();
                
                if ($existing) {
                    return response()->json([
                        'success' => false,
                        'message' => 'A participant with this email already exists for this event'
                    ], 422);
                }
            }

            $participant = EventParticipant::create([
                'event_id' => $eventId,
                'name' => $request->name,
                'email' => $request->email,
                'department' => $request->department,
                'role' => $request->role ?? 'participant',
                'status' => $request->status ?? 'registered',
                'phone' => $request->phone,
                'notes' => $request->notes,
                'registered_by' => auth()->id(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Participant added successfully',
                'data' => $participant
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error adding participant: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to add participant'
            ], 500);
        }
    }

    /**
     * Get a specific participant.
     */
    public function show($eventId, $participantId)
    {
        if (!$this->hasPermission('events')) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        try {
            $participant = EventParticipant::where('event_id', $eventId)
                ->findOrFail($participantId);

            return response()->json([
                'success' => true,
                'data' => $participant
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching participant: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Participant not found'
            ], 404);
        }
    }

    /**
     * Update a participant.
     */
    public function update(Request $request, $eventId, $participantId)
    {
        if (!$this->hasPermission('events')) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'email' => 'nullable|email|max:255',
            'department' => 'nullable|string|max:255',
            'role' => 'nullable|in:participant,speaker,organizer,attendee',
            'status' => 'nullable|in:registered,confirmed,attended,no_show',
            'phone' => 'nullable|string|max:20',
            'notes' => 'nullable|string|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $participant = EventParticipant::where('event_id', $eventId)
                ->findOrFail($participantId);

            // Check for duplicate email
            if ($request->has('email') && $request->email !== $participant->email) {
                $existing = EventParticipant::where('event_id', $eventId)
                    ->where('email', $request->email)
                    ->where('id', '!=', $participantId)
                    ->first();
                
                if ($existing) {
                    return response()->json([
                        'success' => false,
                        'message' => 'A participant with this email already exists for this event'
                    ], 422);
                }
            }

            $participant->update(array_merge(
                $request->all(),
                ['updated_by' => auth()->id()]
            ));

            return response()->json([
                'success' => true,
                'message' => 'Participant updated successfully',
                'data' => $participant
            ]);
        } catch (\Exception $e) {
            Log::error('Error updating participant: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to update participant'
            ], 500);
        }
    }

    /**
     * Update participant status only.
     */
    public function updateStatus(Request $request, $eventId, $participantId)
    {
        if (!$this->hasPermission('events')) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'status' => 'required|in:registered,confirmed,attended,no_show',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $participant = EventParticipant::where('event_id', $eventId)
                ->findOrFail($participantId);

            $participant->update([
                'status' => $request->status,
                'updated_by' => auth()->id(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Participant status updated successfully',
                'data' => $participant
            ]);
        } catch (\Exception $e) {
            Log::error('Error updating participant status: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to update participant status'
            ], 500);
        }
    }

    /**
     * Remove a participant from an event.
     */
    public function destroy($eventId, $participantId)
    {
        if (!$this->hasPermission('events')) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        try {
            $participant = EventParticipant::where('event_id', $eventId)
                ->findOrFail($participantId);

            $participant->delete();

            return response()->json([
                'success' => true,
                'message' => 'Participant removed successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Error removing participant: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to remove participant'
            ], 500);
        }
    }

    /**
     * Bulk add participants to an event.
     */
    public function bulkStore(Request $request, $eventId)
    {
        if (!$this->hasPermission('events')) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'participants' => 'required|array',
            'participants.*.name' => 'required|string|max:255',
            'participants.*.email' => 'nullable|email|max:255',
            'participants.*.department' => 'nullable|string|max:255',
            'participants.*.role' => 'nullable|in:participant,speaker,organizer,attendee',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            Event::findOrFail($eventId);
            $added = [];
            $skipped = [];

            foreach ($request->participants as $participantData) {
                if (isset($participantData['email'])) {
                    $existing = EventParticipant::where('event_id', $eventId)
                        ->where('email', $participantData['email'])
                        ->first();
                    
                    if ($existing) {
                        $skipped[] = $participantData['email'];
                        continue;
                    }
                }

                $participant = EventParticipant::create([
                    'event_id' => $eventId,
                    'name' => $participantData['name'],
                    'email' => $participantData['email'] ?? null,
                    'department' => $participantData['department'] ?? null,
                    'role' => $participantData['role'] ?? 'participant',
                    'status' => 'registered',
                    'registered_by' => auth()->id(),
                ]);

                $added[] = $participant;
            }

            return response()->json([
                'success' => true,
                'message' => 'Participants added successfully',
                'added' => count($added),
                'skipped' => count($skipped),
                'skipped_emails' => $skipped,
                'data' => $added
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error bulk adding participants: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to add participants'
            ], 500);
        }
    }

    /**
     * Get participant statistics for an event.
     */
    public function getStats($eventId)
    {
        if (!$this->hasPermission('events')) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        try {
            Event::findOrFail($eventId);
            
            $stats = [
                'total' => EventParticipant::where('event_id', $eventId)->count(),
                'registered' => EventParticipant::where('event_id', $eventId)->where('status', 'registered')->count(),
                'confirmed' => EventParticipant::where('event_id', $eventId)->where('status', 'confirmed')->count(),
                'attended' => EventParticipant::where('event_id', $eventId)->where('status', 'attended')->count(),
                'no_show' => EventParticipant::where('event_id', $eventId)->where('status', 'no_show')->count(),
            ];

            return response()->json([
                'success' => true,
                'data' => $stats
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching participant stats: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch statistics'
            ], 500);
        }
    }

    /**
     * Export participants to CSV.
     */
    public function export($eventId)
    {
        if (!$this->hasPermission('events')) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        try {
            $event = Event::findOrFail($eventId);
            $participants = EventParticipant::where('event_id', $eventId)->get();

            $headers = [
                'Content-Type' => 'text/csv',
                'Content-Disposition' => 'attachment; filename="participants-' . Str::slug($event->title) . '.csv"',
            ];

            $callback = function() use ($participants) {
                $file = fopen('php://output', 'w');
                
                fputcsv($file, [
                    'Name', 
                    'Email', 
                    'Department', 
                    'Role', 
                    'Status', 
                    'Registered At'
                ]);

                foreach ($participants as $participant) {
                    fputcsv($file, [
                        $participant->name,
                        $participant->email ?? 'N/A',
                        $participant->department ?? 'N/A',
                        $participant->role,
                        $participant->status,
                        $participant->created_at->format('Y-m-d H:i:s')
                    ]);
                }

                fclose($file);
            };

            return response()->stream($callback, 200, $headers);
        } catch (\Exception $e) {
            Log::error('Error exporting participants: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to export participants'
            ], 500);
        }
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