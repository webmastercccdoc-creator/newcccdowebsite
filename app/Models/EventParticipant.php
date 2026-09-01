<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EventParticipant extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     */
    protected $table = 'event_participants';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'event_id',
        'name',
        'email',
        'department',
        'phone',
        'notes',
        'role',
        'status',
        'registered_by',
        'updated_by',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Role constants.
     */
    const ROLE_PARTICIPANT = 'participant';
    const ROLE_SPEAKER = 'speaker';
    const ROLE_ORGANIZER = 'organizer';
    const ROLE_ATTENDEE = 'attendee';

    /**
     * Status constants.
     */
    const STATUS_REGISTERED = 'registered';
    const STATUS_CONFIRMED = 'confirmed';
    const STATUS_ATTENDED = 'attended';
    const STATUS_NO_SHOW = 'no_show';

    /**
     * Get all available roles.
     */
    public static function getRoles(): array
    {
        return [
            self::ROLE_PARTICIPANT,
            self::ROLE_SPEAKER,
            self::ROLE_ORGANIZER,
            self::ROLE_ATTENDEE,
        ];
    }

    /**
     * Get all available statuses.
     */
    public static function getStatuses(): array
    {
        return [
            self::STATUS_REGISTERED,
            self::STATUS_CONFIRMED,
            self::STATUS_ATTENDED,
            self::STATUS_NO_SHOW,
        ];
    }

    /**
     * Get the event that this participant belongs to.
     */
    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    /**
     * Get the user who registered this participant.
     */
    public function registrant(): BelongsTo
    {
        return $this->belongsTo(User::class, 'registered_by');
    }

    /**
     * Get the user who last updated this participant.
     */
    public function updater(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    /**
     * Scope a query to only include participants with a specific status.
     */
    public function scopeWithStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Scope a query to only include participants with a specific role.
     */
    public function scopeWithRole($query, $role)
    {
        return $query->where('role', $role);
    }

    /**
     * Scope a query to only include confirmed participants.
     */
    public function scopeConfirmed($query)
    {
        return $query->where('status', self::STATUS_CONFIRMED);
    }

    /**
     * Scope a query to only include attended participants.
     */
    public function scopeAttended($query)
    {
        return $query->where('status', self::STATUS_ATTENDED);
    }

    /**
     * Scope a query to search participants by name or email.
     */
    public function scopeSearch($query, $search)
    {
        return $query->where('name', 'LIKE', "%{$search}%")
            ->orWhere('email', 'LIKE', "%{$search}%")
            ->orWhere('department', 'LIKE', "%{$search}%");
    }

    /**
     * Check if the participant is confirmed.
     */
    public function isConfirmed(): bool
    {
        return $this->status === self::STATUS_CONFIRMED;
    }

    /**
     * Check if the participant has attended.
     */
    public function hasAttended(): bool
    {
        return $this->status === self::STATUS_ATTENDED;
    }

    /**
     * Check if the participant is a no-show.
     */
    public function isNoShow(): bool
    {
        return $this->status === self::STATUS_NO_SHOW;
    }

    /**
     * Check if the participant is a speaker.
     */
    public function isSpeaker(): bool
    {
        return $this->role === self::ROLE_SPEAKER;
    }

    /**
     * Check if the participant is an organizer.
     */
    public function isOrganizer(): bool
    {
        return $this->role === self::ROLE_ORGANIZER;
    }

    /**
     * Get the status badge color.
     */
    public function getStatusBadgeColorAttribute(): string
    {
        return match ($this->status) {
            self::STATUS_REGISTERED => 'yellow',
            self::STATUS_CONFIRMED => 'green',
            self::STATUS_ATTENDED => 'blue',
            self::STATUS_NO_SHOW => 'red',
            default => 'gray',
        };
    }

    /**
     * Get the role badge color.
     */
    public function getRoleBadgeColorAttribute(): string
    {
        return match ($this->role) {
            self::ROLE_PARTICIPANT => 'gray',
            self::ROLE_SPEAKER => 'purple',
            self::ROLE_ORGANIZER => 'orange',
            self::ROLE_ATTENDEE => 'blue',
            default => 'gray',
        };
    }
}