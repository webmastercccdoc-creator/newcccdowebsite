<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'location',
        'date',
        'time',
        'banner_image_path',
        'image_alt_text',
        'status',
        'department',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'date' => 'date',
        'time' => 'datetime',
    ];

    // Status constants
    const STATUS_ACTIVE = 'active';
    const STATUS_UPCOMING = 'upcoming';
    const STATUS_COMPLETED = 'completed';
    const STATUS_CANCELLED = 'cancelled';

    // Get available statuses
    public static function getStatuses()
    {
        return [
            self::STATUS_ACTIVE,
            self::STATUS_UPCOMING,
            self::STATUS_COMPLETED,
            self::STATUS_CANCELLED,
        ];
    }

    // Accessor for banner image URL
    public function getBannerImageUrlAttribute()
    {
        if (!$this->banner_image_path) {
            return null;
        }
        return asset('storage/' . $this->banner_image_path);
    }

    // Scope for active events
    public function scopeActive($query)
    {
        return $query->where('status', self::STATUS_ACTIVE);
    }

    // Scope for upcoming events
    public function scopeUpcoming($query)
    {
        return $query->where('status', self::STATUS_UPCOMING);
    }

    // Scope for completed events
    public function scopeCompleted($query)
    {
        return $query->where('status', self::STATUS_COMPLETED);
    }

    // Scope for cancelled events
    public function scopeCancelled($query)
    {
        return $query->where('status', self::STATUS_CANCELLED);
    }

    /**
     * Get the participants for this event.
     */
    public function participants(): HasMany
    {
        return $this->hasMany(EventParticipant::class);
    }

    /**
     * Get the confirmed participants for this event.
     */
    public function confirmedParticipants(): HasMany
    {
        return $this->hasMany(EventParticipant::class)->where('status', 'confirmed');
    }

    /**
     * Get the attended participants for this event.
     */
    public function attendedParticipants(): HasMany
    {
        return $this->hasMany(EventParticipant::class)->where('status', 'attended');
    }

    /**
     * Get the user who created this event.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the user who last updated this event.
     */
    public function updater(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    /**
     * Get participant count by status.
     */
    public function getParticipantStats(): array
    {
        return [
            'total' => $this->participants()->count(),
            'registered' => $this->participants()->where('status', 'registered')->count(),
            'confirmed' => $this->participants()->where('status', 'confirmed')->count(),
            'attended' => $this->participants()->where('status', 'attended')->count(),
            'no_show' => $this->participants()->where('status', 'no_show')->count(),
        ];
    }

    /**
     * Get participant count by role.
     */
    public function getRoleStats(): array
    {
        return [
            'participant' => $this->participants()->where('role', 'participant')->count(),
            'speaker' => $this->participants()->where('role', 'speaker')->count(),
            'organizer' => $this->participants()->where('role', 'organizer')->count(),
            'attendee' => $this->participants()->where('role', 'attendee')->count(),
        ];
    }

    /**
     * Check if event has participants.
     */
    public function hasParticipants(): bool
    {
        return $this->participants()->exists();
    }

    /**
     * Get total participants count.
     */
    public function getTotalParticipantsAttribute(): int
    {
        return $this->participants()->count();
    }
}